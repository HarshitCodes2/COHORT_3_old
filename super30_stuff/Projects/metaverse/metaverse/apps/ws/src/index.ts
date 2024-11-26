import { WebSocket, WebSocketServer } from "ws";
import { User } from "./User";
import jwt from "jsonwebtoken";

if (process.env.WS_PORT) {
  const wss = new WebSocketServer({ port: parseInt(process.env.WS_PORT) });

  wss.on("connection", (ws) => {
    let user = new User(ws);
    ws.on("error", console.error);

    ws.on("close", () => {
      user.destroy();
    });
  });
} else {
  console.log("WS_PORT not fount in process.env");
}
