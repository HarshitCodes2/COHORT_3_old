const express = require("express");
const itemRouter = express.Router();
const { authMiddleware } = require("../middleware");
const { AllItems, Wishlist } = require("../db");

itemRouter.use(authMiddleware);

itemRouter.get("/allItems", async (req, res) => {
  let items;
  try {
    items = await AllItems.find();
  } catch (e) {
    return res.status(500).json({
      message: "Unable to get items from db",
    });
  }

  return res.status(200).json({
    items: items,
  });
});


module.exports = {
  itemRouter: itemRouter,
};
