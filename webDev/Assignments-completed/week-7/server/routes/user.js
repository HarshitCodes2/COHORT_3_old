const { Router } = require("express");
const { auth } = require("../middleware/loginAuth");
const { userModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const SALTROUNDS = parseInt(process.env.SALTROUNDS);
const mongoose = require("mongoose");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  // logic to sign up admin
  // console.log("User SignUp Reached");

  const signupBody = z.object({
    email: z.string().min(5).max(100).email(),
    fullName: z.string().min(3).max(100),
    password: z.string().min(5).max(30),
  });

  const inputValidation = signupBody.safeParse(req.body);

  if (!inputValidation.success) {
    console.log("Invalid Inputs");

    return res.status(401).json({
      message: "Incorrect Creds",
      error: inputValidation.error,
    });
  }

  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName;

  console.log(req.body);
  

  try {
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
    console.log(hashedPassword);
    try {
      await userModel.create({
        email: email,
        password: hashedPassword,
        name: fullName,
      });

      
    } catch (err) {
      return res.json({
        message: `${err.keyValue.email} Already in use`,
      });
    }
  } catch (e) {
    return res.json({
      message: "Failed to create an Account",
      error: e,
    });
  }

  return res.json({
    message: "You have Signed Up",
  });
});

userRouter.post("/login", async (req, res) => {
  // logic to log in admin
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found Please Sign up",
    });
  }

  const hashedPassword = user.password;

  const userMatched = await bcrypt.compare(password, hashedPassword);

  // console.log(userMatched);

  if (userMatched) {
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      JWT_SECRET
    );

    return res.json({
      token: token,
      message: "You have been signed in",
    });
  } else {
    return res.status(401).json({
      message: "Incorrect Credentials",
    });
  }
});

userRouter.use(auth);

userRouter.get("/courses", async (req, res) => {
  // logic to list all courses
  // const userId = req.user.userId;

  try {
    const courseList = await courseModel.find();
    return res.json({
      courseList: courseList,
    });
  } catch (e) {
    console.log(
      "Something wrong with the database, error in user course get request"
    );
    console.log(e);
    return res.status(500);
  }
});

userRouter.post("/courses/:courseId", async (req, res) => {
  // logic to purchase a course

  const userId = req.user.userId;
  const courseIdStr = req.params.courseId;

  const courseId = new mongoose.Types.ObjectId(courseIdStr);
  // console.log(userId + "----->" + courseId);

  try {
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: { coursesBought: { courseId: courseId } },
      }
    );
    // console.log(user.coursesBought);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.log("Error purchasing course:", e);
    return res.status(500).json({ message: "Internal server error" });
  }

  return res.status(200).json({
    message: "Successfully Bought",
  });
});

userRouter.get("/purchasedCourses", async (req, res) => {
  // logic to view purchased courses

  const userId = req.user.userId;
  console.log(userId);

  // Edit the code below to send a list of course Objects
  try {
    // const user = await userModel.findOneAndUpdate({
    //     _id : userId
    // }).populate('Course').exec();
    const user = await userModel
      .findById(userId)
      .populate("coursesBought.courseId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    const courseList = user.coursesBought.map((course) => course.courseId);

    return res.json({
      courseList: courseList,
    });
  } catch (e) {
    console.log("Error in Purchased Courses");
    console.log(e);
    return res.status(500);
  }
});

module.exports = {
  userRouter: userRouter,
};
