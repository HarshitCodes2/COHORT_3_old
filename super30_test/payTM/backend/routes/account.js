const express = require("express");
const accountRouter = express.Router();
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");

accountRouter.use(authMiddleware);

accountRouter.get("/balance", async (req, res) => {
  let account;
  let user;

  try {
    account = await Account.findOne({
      userId: req.userId,
    });
  } catch (e) {
    res.status(411).json({
      message: `Some error in accountRoute ${e}`,
    });
  }

  try{
    user = await User.findOne({
      _id: req.userId,
    });
  } catch (e) {
    res.status(411).json({
      message: `Some error in accountRoute getting user ${e}`,
    });
  }

  console.log(user);
  
  const firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1);

  res.status(200).json({
    balance: account.balance,
    firstName: firstName
  });
});

accountRouter.post("/transfer", async (req, res) => {
  console.log("user : " + req.body.to);
  console.log("amt : " + req.body.amount);
  
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const fromAccount = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (fromAccount.balance < req.body.amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    console.log("yeahÆ");

    let toAccount;

    try{
      toAccount = await Account.findOne({
        userId: req.body.to,
      }).session(session);
    }catch(e){
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    console.log("BabyÆ");
    

    // console.log(toAccount.userId);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    let amount = req.body.amount;

    await Account.findOneAndUpdate(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.findOneAndUpdate(
      { userId: req.body.to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    await session.endSession();

    res.status(200).json({
      message: "Transfer successful",
    });
    
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();

    return res.status(400).json({
      message: `Transfer Failed ${e}`,
    });
  }
});

module.exports = {
  accountRouter: accountRouter,
};
