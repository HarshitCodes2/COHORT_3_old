const express = require("express");
const cartRouter = express.Router();
const { authMiddleware } = require("../middleware");
const { Cart, AllItems } = require("../db");
const { default: mongoose } = require("mongoose");

cartRouter.use(authMiddleware);

cartRouter.get("/", async (req, res) => {
  const userId = req.userId;
  let userCartObj;

  try {
    userCartObj = await Cart.findOne({
      userId: userId,
    });
  } catch (e) {
    console.log("getuserCartObj");
    console.log(e);
    return res.status(500).json({
      message: "some error in db for fetching",
    });
  }

  if (userCartObj == null) {
    return res.status(200).json({
      cart: [],
    });
  } else {
    const cart = userCartObj.items;

    return res.status(200).json({
      cart: cart,
    });
  }
});

cartRouter.get("/itemcount", async (req, res) => {
  const userId = req.userId;
  let userCartObj;

  try {
    userCartObj = await Cart.findOne({
      userId: userId,
    });
  } catch (e) {
    console.log("getuserCartObj");
    console.log(e);
    return res.status(500).json({
      message: "some error in db for fetching",
    });
  }

  if (userCartObj == null) {
    return res.status(200).json({
      count: 0,
    });
  } else {
    const count = userCartObj.items.length;

    return res.status(200).json({
      count: count,
    });
  }
});

cartRouter.post("/additem", async (req, res) => {
  const userId = req.userId;
  const itemId = req.body.itemId;

  let userCartObj;
  let newItemsList;

  try {
    userCartObj = await Cart.findOne({
      userId: userId,
    });
  } catch (e) {
    console.log("getuserCartObj");
    console.dir(e);
    return res.status(500).json({
      message: "some error in db for fetching",
    });
  }

  if (userCartObj == null) {
    // user did not have a Cart before
    const itemObj = {
      item: itemId,
      count: 1,
    };
    try {
      await Cart.create({
        userId: userId,
        items: [itemObj],
      });
      newItemsList = [itemObj];
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "some error in db for creating",
      });
    }
  } else {
    const userCart = userCartObj.items;

    const itemExists = userCart.some(
      (cartItem) => cartItem.item.toString() === itemId
    );

    if (itemExists) {
      return res.status(400).json({
        message: "Item already in Cart",
      });
    }

    const itemObj = {
      item: itemId,
      count: 1,
    };

    newItemsList = [...userCart, itemObj];

    try {
      await Cart.updateOne(
        {
          userId: userId,
        },
        {
          items: newItemsList,
        }
      );
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "some error in db for updating",
      });
    }
  }

  console.log(newItemsList);

  res.status(200).json({
    message: "Item added in Cart",
    cart: newItemsList,
  });
});

cartRouter.post("/decreaseCount", async (req, res) => {
  const userId = req.userId;
  const itemId = req.body.itemId;

  let userCart;
  try {
    userCart = await Cart.findOne({
      userId: userId,
    });

    if (!userCart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemIndex = userCart.items.findIndex(
      (cartItem) => cartItem.item.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    if (userCart.items[itemIndex].count > 1) {
      userCart.items[itemIndex].count -= 1;
    }

    await userCart.save();
  } catch (e) {
    return res.status(500).json({
      message: "Error in Cart getting",
    });
  }

  return res.status(200).json({
    message: "Done",
    cart: userCart.items,
  });
});

cartRouter.post("/increaseCount", async (req, res) => {
  const userId = req.userId;
  const itemId = req.body.itemId;

  let userCart;
  try {
    userCart = await Cart.findOne({
      userId: userId,
    });

    if (!userCart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemIndex = userCart.items.findIndex(
      (cartItem) => cartItem.item.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    if (userCart.items[itemIndex].count >= 1) {
      userCart.items[itemIndex].count += 1;
    }

    console.log(userCart);
    await userCart.save();
  } catch (e) {
    return res.status(500).json({
      message: "Error in Cart getting",
    });
  }

  return res.status(200).json({
    message: "Done",
    cart: userCart.items,
  });
});

cartRouter.post("/delete", async (req, res) => {
  const userId = req.userId;
  const itemId = req.body.itemId;

  let userCart;
  try {
    userCart = await Cart.findOne({
      userId: userId,
    });

    if (!userCart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemIndex = userCart.items.findIndex(
      (cartItem) => cartItem.item.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    userCart.items.splice(itemIndex, 1);

    // console.log(userCart);
    await userCart.save();
  } catch (e) {
    return res.status(500).json({
      message: "Error in Cart getting",
    });
  }

  return res.status(200).json({
    message: "Done",
    cart: userCart.items,
  });
});

cartRouter.post("/restore", async (req, res) => {
  const userId = req.userId;
  const oldCart = req.body.oldCart;

  try {
    await Cart.updateOne(
      {
        userId: userId,
      },
      {
        items: oldCart,
      }
    );
  } catch (e) {
    console.log("Error");
    console.log(e);

    return res.status(500).json({
      message: "Error Occured in DB",
    });
  }

  res.status(200).json({
    cart: oldCart,
  });
});

cartRouter.post("/clear", async (req, res) => {
  const userId = req.userId;

  try {
    await Cart.updateOne(
      {
        userId: userId,
      },
      {
        items: [],
      }
    );
  } catch (e) {
    console.log("Error");
    console.log(e);

    return res.status(500).json({
      message: "Error Occured in DB",
    });
  }

  res.status(200).json({
    message: "Cart cleared",
  });
});

cartRouter.get("/purchase", async (req, res) => {
  const userId = req.userId;

  try{
  const session = await mongoose.startSession();

  session.startTransaction();

  let cart;

  try {
    const res = await Cart.findOne({
      userId: userId,
    }).session(session);

    cart = res.items;
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: "Error with DB",
      status: false
    });
  }

  let allItems;
  try {
    const res = await AllItems.find().session(session);
    // throw("adsa");
    allItems = res;
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    console.log(e);
    return res.status(500).json({
      message: "Error with DB",
      status: false
    });
  }

  for (let cartItem of cart) {
    const item = allItems.find(
      (item) => item._id.toString() === cartItem.item.toString()
    );
    if (!item || item.quantity < cartItem.count) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: `Item ${cartItem.item} is out of stock or insufficient quantity`,
        status: false
      });
    }
  }

  for (let cartItem of cart) {
    const item = allItems.find(
      (item) => item._id.toString() === cartItem.item.toString()
    );
    item.quantity -= cartItem.count;
    await item.save();
  }

  await session.commitTransaction();
  session.endSession();

  res.status(200).json({
    message: "Done",
    status: true,
  });
  }catch(e){
    res.status(411).json({
      message: "Too many requests",
      status: false
    });
  }
});

module.exports = {
  cartRouter: cartRouter,
};
