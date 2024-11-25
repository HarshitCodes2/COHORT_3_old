import e, { Router } from "express";
import { adminAuth } from "../../middleware/adminauth";
import {
  CreateAvatarSchema,
  CreateElementSchema,
  CreateMapSchema,
  UpdateElementSchema,
} from "../../types";
import client from "@repo/db/client";
import { Response } from "express";

export const adminRouter = Router();

const parseFailed = (res: Response) => {
  res.status(400).json({
    message: "Invalid Input",
  });
  return;
};

const creationFailed = (res: Response) => {
  res.status(500).json({
    message: "Could not Create, something wrong with database",
  });
  return;
};

const notFoundinDb = (res: Response) => {
  res.status(400).json({
    message: "Does not exist",
  });
  return;
};

adminRouter.post("/element", adminAuth, async (req, res) => {
  const parsedData = CreateElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    parseFailed(res);
    return;
  }

  const element = await client.element.create({
    data: {
      imageUrl: parsedData.data.imageUrl,
      width: parsedData.data.width,
      height: parsedData.data.height,
      static: parsedData.data.static,
    },
  });

  if (!element) {
    creationFailed(res);
    return;
  }

  res.json({
    id: element.id,
  });
});

adminRouter.put("/element/:elementId", adminAuth, async (req, res) => {
  const parsedData = UpdateElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    parseFailed(res);
    return;
  }

  const elementId = req.params.elementId;

  const element = await client.element.findUnique({
    where: {
      id: elementId,
    },
  });

  if (!element) {
    notFoundinDb(res);
    return;
  }

  await client.element.update({
    where: {
      id: elementId,
    },
    data: {
      imageUrl: parsedData.data.imageUrl,
    },
  });

  res.json({
    message: "Element Updated"
  })
});

adminRouter.post("/avatar", adminAuth, async (req, res) => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);

  if (!parsedData.success) {
    parseFailed(res);
    return;
  }

  const avatar = await client.avatar.create({
    data: {
      imgUrl: parsedData.data.imageUrl,
      name: parsedData.data.name,
    },
  });

  if (!avatar) {
    creationFailed(res);
    return;
  }

  res.json({
    avatarId: avatar.id,
  });
});

adminRouter.post("/map", adminAuth, async (req, res) => {
  const parsedData = CreateMapSchema.safeParse(req.body);

  if (!parsedData.success) {
    parseFailed(res);
    return;
  }

  const width = parseInt(parsedData.data.dimensions.split("x")[0]);
  const height = parseInt(parsedData.data.dimensions.split("x")[1]);

  parsedData.data.defaultElements.forEach((e) => {
    if (e.x > width || e.y > height) {
      res.status(400).json({
        message: "Element out of range",
      });
      return;
    }
  });

  const map = await client.map.create({
    data: {
      name: parsedData.data.name,
      width: width,
      height: height,
      thumbnail: parsedData.data.thumbnail,
      mapElements: {
        create: parsedData.data.defaultElements.map((e) => ({
          elementId: e.elementId,
          x: e.x,
          y: e.y,
        })),
      },
    },
  });

  res.json({
    id: map.id,
  });
});
