import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { UserSignInSchema, UserSignUpSchema } from "../../types";
import client from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();
const SALTROUNDS: number = parseInt(process.env.SALTROUNDS || "10");

export const rootRouter = Router();

rootRouter.post("/signup", async (req, res) => {
  const parsedData = UserSignUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Inputs",
    });
    return;
  }

  const hashedPassword = bcrypt.hashSync(parsedData.data.password, SALTROUNDS);

  try {
    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.type === "admin" ? "Admin" : "User",
      },
    });
    res.status(200).json({
      userId: user.id,
    });
    return;
  } catch (e) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
});

rootRouter.post("/signin", async (req, res) => {
  const parsedData = UserSignInSchema.safeParse(req.body);

  if(!parsedData.success){
    res.status(400).json({
      message: "Invalid Input"
    });
    return;
  }

  try {
    const user = await client.user.findFirst({
      where: {
        username: parsedData.data.username,
      },
    });

    if(!user){
      res.status(400).json({
        message: "User not found"
      });
      return;
    }

    if (parsedData.data.password && user.password) {
      const passwordMatch = bcrypt.compareSync(
        parsedData.data.password,
        user.password
      );

      if (!passwordMatch) {
        res.status(403).json({
          message: "Wrong Password",
        });
        return;
      }

      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET || "DEFAULTJWTSECRETWHENICANNOTFETCHJWTSECRET"
      );

      res.json({
        token: token,
      });
      return;
    }
  } catch (e) {
    res.status(403).json({
      message: "User does not exist",
    });
    return;
  }
});

rootRouter.get("/avatars", async (req, res) => {
  try {
    const avatars = await client.avatar.findMany({});
    res.json({
      avatars: avatars.map(m => ({
        id: m.id,
        imgUrl: m.imgUrl,
        name: m.name
      })),
    });
    return;
  } catch (e) {
    res.status(400).json({
      message: "Cannot Fetch Avatars",
    });
    return;
  }
});

rootRouter.get("/elements", async (req, res) => {
  try {
    const elements = await client.element.findMany({});
    res.json({
      elements: elements.map(e => ({
        id: e.id,
        imageUrl: e.imageUrl,
        width: e.width,
        height: e.height,
        static: e.static
    }))
    });
    return;
  } catch (e) {
    res.status(400).json({
      message: "Cannot Fetch Elements",
    });
    return;
  }
});

rootRouter.use("/user", userRouter);
rootRouter.use("/space", spaceRouter);
rootRouter.use("/admin", adminRouter);
