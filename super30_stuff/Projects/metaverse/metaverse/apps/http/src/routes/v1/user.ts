import { Router } from "express";
import { userAuth } from "../../middleware/userauth";
import { UpdateUserMetadata } from "../../types";
import client from "@repo/db/client";

export const userRouter = Router();

userRouter.post("/metadata", userAuth, async (req, res) => {
  const parsedData = UpdateUserMetadata.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Data Sent",
    });
    return;
  }

  const avatar = await client.avatar.findUnique({
    where: {
      id: parsedData.data.avatarId,
    },
  });

  if (!avatar) {
    res.status(400).json({
      message: "Invalid Avatar Id",
    });
    return;
  }

  try {
    const user = await client.user.findFirst({
      where: {
        id: req.userId,
      },
    });

    if (user) {
      user.avatarId = parsedData.data.avatarId;

      res.json({
        avatarId: user.avatarId,
      });
    } else {
      res.status(400).json({
        message: "User cannot be found",
      });
      return;
    }
  } catch (e) {
    res.status(400).json({
      message: "User cannot be found",
    });
    return;
  }
});

userRouter.get("/metadata/bulk", async (req, res) => {
  const idsStr = req.query.ids as string;
  const idsArr = idsStr.split(",") as Array<string>;

  try {
    const userdata = await client.user.findMany({
      where: {
        id: {
          in: idsArr,
        },
      },
      select: {
        avatar: true,
        id: true,
      },
    });

    res.json({
      avatars: userdata.map((m) => ({
        userId: m.id,
        imgUrl: m.avatar?.imgUrl,
      })),
    });
    return;
  } catch (e) {
    res.status(400).json({
      message: "Cannot fetch User metadata",
    });
    return;
  }
});
