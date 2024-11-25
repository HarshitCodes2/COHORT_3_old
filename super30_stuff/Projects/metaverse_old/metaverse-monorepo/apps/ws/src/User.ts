import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocket } from "ws";
require("dotenv").config();
import client from "@repo/db/client";
import { RoomManager } from "./RoomManager";
import { OutgoingMessage } from "./types";

function randomStr(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return str;
}

export class User {
  public id: string;
  public userId?: string;
  private spaceId?: string;
  private x: number;
  private y: number;
  private ws: WebSocket;

  constructor(ws: WebSocket) {
    this.id = randomStr(10);
    this.x = 0;
    this.y = 0;
    this.ws = ws;
    this.initHandlers();
  }

  initHandlers() {
    this.ws.on("message", async (data) => {
      const parsedData = JSON.parse(data.toString());
      const spaceId = parsedData.payload.spaceId;
      const token = parsedData.payload.token;

      if (!process.env.JWT_SECRET) {
        console.log("JWT_SECRET UNREADABLE");
        return;
      }
      const userId = (jwt.verify(token, process.env.JWT_SECRET) as JwtPayload)
        .userId;

      if (!userId) {
        this.ws.close();
        return;
      }

      this.userId = userId;

      const space = await client.space.findFirst({
        where: {
          id: spaceId,
        },
      });

      if (!space) {
        this.ws.close();
        return;
      }

      this.spaceId = spaceId;

      switch (parsedData.type) {
        case "join":
          RoomManager.getInstance().addUser(spaceId, this);

          // Update add Spawn area login in the Space Schema
          // this.x = space.spawnX;
          // this.y = space.spawnY;

          this.x = 10;
          this.y = 10;

          this.ws.send(
            JSON.stringify({
              type: "space-joined",
              spawn: {
                x: this.x,
                y: this.y,
              },
              users: RoomManager.getInstance().rooms.get(spaceId),
            })
          );

          RoomManager.getInstance().broadcast(
            {
              type: "user-join",
              payload: {
                userId: 1,
                x: 1,
                y: 2,
              },
            },
            this,
            spaceId
          );

          break;

        case "move":
          const toX = parsedData.payload.x;
          const toY = parsedData.payload.y;

          const displacementX = Math.abs(this.x - toX);
          const displacementY = Math.abs(this.y - toY);

          if (
            (displacementX == 1 && displacementY == 0) ||
            (displacementX == 0 && displacementY == 1)
          ) {
            if (toX < 0 || toX > space.width || toY < 0 || toY > space.height) {
              this.ws.send(
                JSON.stringify({
                  type: "movement-rejected",
                  payload: {
                    x: this.x,
                    y: this.y,
                  },
                })
              );
            } else {
              RoomManager.getInstance().broadcast(
                {
                  type: "movement",
                  payload: {
                    x: toX,
                    y: toY,
                    userId: "123",
                  },
                },
                this,
                this.spaceId!
              );
            }
          }

          this.ws.send(
            JSON.stringify({
              type: "movement-rejected",
              payload: {
                x: this.x,
                y: this.y,
              },
            })
          );
          break;
      }
    });
  }

  public send(data: OutgoingMessage) {
    this.ws.send(JSON.stringify(data));
  }

  destroy() {
    RoomManager.getInstance().broadcast(
      {
        type: "user-left",
        payload: {
          userId: this.userId,
        },
      },
      this,
      this.spaceId!
    );
    RoomManager.getInstance().removeUser(this.spaceId!, this);
  }
}
