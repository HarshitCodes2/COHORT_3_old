import { Router, text } from "express";
import { userAuth } from "../../middleware/userauth";
import {
  AddElementSchema,
  CreateSpaceSchema,
  DeleteElementSchema,
} from "../../types";
import client from "@repo/db/client";

export const spaceRouter = Router();

spaceRouter.post("/", userAuth, async (req, res) => {
  const parsedData = CreateSpaceSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Incorrect data sent",
    });
    return;
  }

  if (!parsedData.data.mapId && !parsedData.data.dimensions) {
    res.status(400).json({
      message: "Incorrect data sent",
    });
    return;
  }

  try {
    if (!parsedData.data.mapId && parsedData.data.dimensions) {
      const space = await client.space.create({
        data: {
          name: parsedData.data.name,
          width: parseInt(parsedData.data.dimensions.split("x")[0]),
          height: parseInt(parsedData.data.dimensions.split("x")[1]),
          creatorId: req.userId as string,
        },
      });

      res.json({
        spaceId: space.id,
      });
      return;
    } else {
      const map = await client.map.findUnique({
        where: {
          id: parsedData.data.mapId,
        },
        select: {
          mapElements: true,
          width: true,
          height: true,
        },
      });

      if (!map) {
        res.status(400).json({
          message: "Map does not exist",
        });
        return;
      }

      const space = await client.$transaction(async () => {
        const space = await client.space.create({
          data: {
            name: parsedData.data.name,
            width: map.width,
            height: map.height,
            creatorId: req.userId!,
          },
        });

        await client.spaceElement.createMany({
          data: map.mapElements.map((e) => ({
            spaceId: space.id,
            elementId: e.elementId,
            x: e.x!,
            y: e.y!,
          })),
        });

        return space;
      });

      res.json({
        spaceId: space.id,
      });
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "DataBase error, could not create Space",
    });
    return;
  }
});

spaceRouter.delete("/element", userAuth, async (req, res) => {
  // console.log("FAFASFFSAFSFSFAFASFFSAFSFSFAFASFFSAFSFSFAFASFFSAFSFS");
  
  const parsedData = DeleteElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Input",
    });
    return;
  }

  const spaceElement = await client.spaceElement.findUnique({
    where: {
      id: parsedData.data.id,
    },
    include: {
      space: true,
    },
  });

  if (!spaceElement) {
    res.status(400).json({
      message: "Element Does not exist",
    });
    return;
  }

  if (spaceElement.space.creatorId !== req.userId) {
    res.status(403).json({
      message: "UnAuthorized",
    });
    return;
  }

  await client.spaceElement.delete({
    where: {
      id: parsedData.data.id,
    },
  });

  res.json({
    message: "Element deleted",
  });
  return;
});


spaceRouter.delete("/:spaceId", userAuth, async (req, res) => {
  const spaceId = req.params.spaceId;

  try {
    const space = await client.space.findUnique({
      where: {
        id: spaceId,
      },
      select: {
        creatorId: true,
      },
    });

    if (!space) {
      res.status(400).json({
        message: "No Space for the given spaceId",
      });
      return;
    }

    if (space.creatorId != req.userId) {
      res.status(400).json({
        message: "You cannot delete someone else's Space",
      });
      return;
    }

    await client.space.delete({
      where: {
        id: spaceId,
      },
    });

    res.json({
      message: "Space deleted",
    });
  } catch (e) {
    res.status(500).json({
      message: "Some Error with Db",
    });
  }
});

spaceRouter.get("/all", userAuth, async (req, res) => {
  try {
    const spaces = await client.space.findMany({
      where: {
        creatorId: req.userId,
      },
      select: {
        id: true,
        name: true,
        width: true,
        height: true,
        thumbnail: true,
      },
    });

    const spacesInfo = spaces.map((m) => ({
      id: m.id,
      name: m.name,
      dimensions: `${m.width}x${m.height}`,
      thumbnail: m.thumbnail,
    }));

    res.json({
      spaces: spacesInfo,
    });
    return;
  } catch (e) {
    res.status(500).json({
      message: "Something wrong with DB",
    });
    return;
  }
});

spaceRouter.get("/:spaceId", async (req, res) => {
  // console.log("GETGETGETGETGETGETGETGETGETGETGETGETGETGETGETGETGET");
  
  // get space is from req.params

  const spaceId = req.params.spaceId;

  try {
    const space = await client.space.findFirst({
      where: {
        id: spaceId,
      },
      include: {
        SpaceElements: {
          include: {
            element: true,
          },
        },
      },
    });

    if (!space) {
      res.status(400).json({
        message: "Space not found",
      });
      return;
    }

    const dimensions: string = `${space.width}x${space.height}`;

    res.json({
      dimensions: dimensions,
      elements: space.SpaceElements.map((e) => ({
        id: e.id,
        element: {
          id: e.element.id,
          imageUrl: e.element.imageUrl,
          width: e.element.width,
          height: e.element.height,
          static: e.element.static,
        },
        x: e.x,
        y: e.y,
      })),
    });
  } catch (e) {
    res.status(500).json({
      message: "Error in DB",
    });
  }
});

spaceRouter.post("/element", userAuth, async (req, res) => {
  // console.log("POSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOST");

  const parsedData = AddElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Input",
    });
    return;
  }

  const element = await client.element.findUnique({
    where: {
      id: parsedData.data.elementId,
    },
  });

  if (!element) {
    res.status(400).json({
      message: "Invalid Element Id",
    });
    return;
  }

  const space = await client.space.findUnique({
    where: {
      id: parsedData.data.spaceId,
    },
  });

  if (!space) {
    res.status(400).json({
      message: "Invalid Space Id",
    });
    return;
  }

  if (parsedData.data.x > space.width || parsedData.data.y > space.height) {
    res.status(400).json({
      message: "Point is outside of the boundary",
    });
    return;
  }

  const spaceElement = await client.spaceElement.create({
    data: {
      elementId: parsedData.data.elementId,
      spaceId: parsedData.data.spaceId,
      x: parsedData.data.x,
      y: parsedData.data.y,
    },
  });

  if (!spaceElement) {
    res.status(500).json({
      message: "Something wrong with DB",
    });
    return;
  }

  res.json({
    message: "Added Element to Space",
  });

  return;
});

