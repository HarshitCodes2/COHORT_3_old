const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const { z } = require('zod');
const { User } =  require("../db")
const bcrypt = require('bcrypt');
const SALTROUNDS = parseInt(process.env.SALTROUNDS);
const { authMiddleware } = require("../middleware");


userRouter.post("/signup", async (req, res) => {
  const inputValidator = z.object({
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    username: z.string().min(3).max(30),
    password: z.string().min(6)
  });

  const userInfo = req.body;

  const isInputValid = inputValidator.safeParse(userInfo);  

  if(!isInputValid.success){
    console.log("Invalid Inputs");
  
    res.status(411).json({
      message: "Invalid inputs"
    });

    return;
  }

  const fName = req.body.firstName.toLowerCase();
  const lName = req.body.lastName.toLowerCase();
  const username = req.body.username;
  const password = req.body.password;

  let userId;

  try{
    const hashedPassword = bcrypt.hashSync(password, SALTROUNDS);
    try{
      const createdDocument = await User.create({
        firstName: fName,
        lastName: lName,
        email: username,
        username: username,
        password: hashedPassword,
      });

      userId = createdDocument._id;      

    }catch(err){
      console.log(err);
      
      return res.status(411).json({
        message: `email already taken`
      });
    }
  }catch(e){
    return res.status(500).json({
      message: `Error : ${e}`
    });
  }

  const token = jwt.sign({
    userId: userId
  }, process.env.JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
	  token: token
  });
})

userRouter.post("/signin", async (req, res) => {
  const inputValidator = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6)
  });

  const userInfo = req.body;

  const isInputValid = inputValidator.safeParse(userInfo);

  if(!isInputValid.success){
    console.log("Invalid Inputs");
  
    res.status(411).json({
      message: "Invalid inputs"
    });

    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username: username
  });

  if(user === null){
    res.status(411).json({
      message: "Unregistered Username please signup"
    });
    return;
  }

  const userMatched = bcrypt.compareSync(password, user.password);

  if(!userMatched){
    res.status(411).json({
      message: "Incorrect password"
    });
    return;
  }

  const token = jwt.sign({
    userId: user._id
  }, process.env.JWT_SECRET);
  
  res.status(200).json({
    fName: user.firstName,
    token: token
  })
})


userRouter.use(authMiddleware);

userRouter.get('/name', async (req, res) => {

  try{
    const user = await User.findOne({
      _id: req.userId
    });

    return res.status(200).json({
      message: "Done",
      name: user.firstName
    });
  }catch(e){
    return res.status(500).json({
      message: "Db not responding"
    });
  }
})

module.exports = {
  userRouter: userRouter
}
