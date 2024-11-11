const express = require("express");
const wishlistRouter = express.Router();
const { authMiddleware } = require("../middleware");
const { Wishlist } = require("../db");

wishlistRouter.use(authMiddleware);

wishlistRouter.get("/", async (req, res) => {
  const userId = req.userId;
  let userWishlistObj;

  try {
    userWishlistObj = await Wishlist.findOne({
      userId: userId,
    });
  } catch (e) {
    console.log("getuserWishlistObj");
    console.log(e);
    return res.status(500).json({
      message: "some error in db for fetching",
    });
  }
  if(userWishlistObj == null){
    return res.status(200).json({
      wishlist: []
    })
  }else{
    const wishlist = userWishlistObj.items;

    return res.status(200).json({
      wishlist: wishlist
    });
  }

})

wishlistRouter.get("/itemcount", async (req, res) => {
  const userId = req.userId;
  let userWishlistObj;

  try {
    userWishlistObj = await Wishlist.findOne({
      userId: userId,
    });
  } catch (e) {
    console.log("getuserWishlistObj");
    console.log(e);
    return res.status(500).json({
      message: "some error in db for fetching",
    });
  }

  if(userWishlistObj == null){
    return res.status(200).json({
      count: 0
    })
  }else{
    const count = userWishlistObj.items.length;

    return res.status(200).json({
      count: count
    });
  }
});

wishlistRouter.post("/additem", async (req, res) => {
  const userId = req.userId;

  let userWishlistObj;
  let newItemsList;

  try {
    userWishlistObj = await Wishlist.findOne({
      userId: userId,
    });
  } catch (e) {
    console.log("getuserWishlistObj");
    console.log(e);
    return res.status(500).json({
      message: "some error in db for fetching"
    })
  }

  if (userWishlistObj == null) {
    // user did not have a wishlist before
    try {
      await Wishlist.create({
        userId: userId,
        items: [req.body.itemId],
      });
      newItemsList = [req.body.itemId];
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "some error in db for creating"
      })
    }
  } else {
    const userWishlist = userWishlistObj.items;
    const itemId = req.body.itemId;
    
    if (userWishlist.includes(itemId)) {
      return res.status(400).json({
        message: "Item already in wishlist",
      });
    }

    newItemsList = [...userWishlist, itemId];

    try {
      await Wishlist.updateOne({
        userId: userId,
      },{
        items: newItemsList
      });

    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "some error in db for updating"
      })
    }
  }

  res.status(200).json({
    message: "Item added in wishlist",
    wishlist: newItemsList
  });
});

wishlistRouter.post("/delete", async (req, res) => {
  const userId = req.userId;
  const itemId = req.body.itemId;

  try {
    userWishlistObj = await Wishlist.findOne({
      userId: userId,
    });
  } catch (e) {
    console.log("getuserWishlistObj in delete");
    console.log(e);
    return res.status(500).json({
      message: "some error in db for fetching"
    })
  }

  const wishlist = userWishlistObj.items;

  const itemIndex = wishlist.findIndex(item => item.toString() === itemId.toString());

  if (itemIndex === -1) {
    return res.status(404).json({
      message: "Item not found in wishlist"
    });
  }

  wishlist.splice(itemIndex, 1);
  const updatedList = wishlist;
  await userWishlistObj.save();
  
  res.status(200).json({
    message: "Done",
    updatedList: updatedList
  })

})


module.exports = {
  wishlistRouter: wishlistRouter,
};

