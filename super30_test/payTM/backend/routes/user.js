const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const { z } = require('zod');
const { User, Account } = require("../db");
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

  let userId = null;

  try{
    const hashedPassword = bcrypt.hashSync(password, SALTROUNDS);
    try{
      const createdDocument = await User.create({
        username: username,
        firstName: fName,
        lastName: lName,
        password: hashedPassword
      });

      userId = createdDocument._id;

      await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
      })

    }catch(err){
      return res.status(411).json({
        message: `${err.keyValue.username} already taken`
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
    token: token
  })
})

userRouter.use(authMiddleware);

userRouter.put("/", async (req, res) => {
  const userId = req.userId;

  const updateBody = z.object({
      password: z.string().min(6),
      firstName: z.string().max(50),
      lastName: z.string().max(50)
  })

  const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
  }

  const { password, firstName, lastName } = req.body;

  const hashedPassword = bcrypt.hashSync(password, SALTROUNDS);  

  let result;
  try{
    result = await User.findOneAndUpdate({
      _id: userId
    },{
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName
    });
  }catch(e){
    return res.status(500).json({
      message: `error in finding user : ${e}`
    });
  }

  if (result == null){
    return res.status(411).json({
      message: "Not Authorized"
    })
  }

  res.status(200).json({
    message: "Updated successfully"
  });

})

userRouter.get("/bulk", async (req, res) => {
  // filterable via firstName/lastName - 
  // Assuming, ?filter=harkirat means only one input, 
  // searching the key word in firstName and lastName both

  let keyword;

  try{
    keyword = req.query.filter.toLowerCase();  
  }catch(e){
    keyword = "";
  }
  const users = await User.find({
    // $or : [
    //   {
    //     firstName: {
    //       "$regex" : keyword
    //     }
    //   },
    //   {
    //     lastName: {
    //       "$regex" : keyword
    //     }
    //   }
    // ]
    $and: [
    {
      _id: { $ne: req.userId }
    },
    {
      $or: [
        {
          firstName: {
            "$regex": keyword,
            "$options": "i" // Case-insensitive search
          }
        },
        {
          lastName: {
            "$regex": keyword,
            "$options": "i" // Case-insensitive search
          }
        }
      ]
    }
  ]
  });

  res.status(200).json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  })

})

module.exports = {
  userRouter: userRouter
}
