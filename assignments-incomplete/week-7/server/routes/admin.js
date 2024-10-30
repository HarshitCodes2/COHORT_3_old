const { Router } = require("express");
const { auth } = require("../middleware/loginAuth");
const { adminModel, courseModel } = require("../db");
const bcrypt = require('bcrypt');
const { z } = require("zod");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const SALTROUNDS = parseInt(process.env.SALTROUNDS);

const adminRouter = Router();

adminRouter.post('/signup',async (req, res) => {
    // logic to sign up admin

    // console.log("Admin SignUp reached");

    const signupBody = z.object({
        email : z.string().min(5).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(5).max(30)
    })

    // console.log(req.body);
    const inputValidation = signupBody.safeParse(req.body);

    if(!inputValidation.success){
        // console.log("Input Validation Failed");
        res.status(301).json({
            message: "Incorrect Creds",
            error: inputValidation.error
        });
        return;
    }
    
    const adminName = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // console.log(adminName + email + password);
    

    try{
        const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
        // console.log(hashedPassword);
        try{
            await adminModel.create({
                email: email,
                password: hashedPassword,
                name: adminName
            });
            // console.log("Admin created");
            
        }catch(e){
            console.log(e);
            
            res.json({
                message: `${err.keyValue.email} Already in use`
            })
            return;
        }
    }catch(e){
        console.log(e);
        
        res.json({
            message : "Failed to create an Account",
            error : e
        });
        return;
    }

    res.json({
        message : "You have Signed Up"
    })

});

adminRouter.post('/login', async (req, res) => {
    // logic to log in admin
    // console.log("Admin Login Reached");

    const email = req.body.email;
    const password = req.body.password;

    const admin = await adminModel.findOne({
        email : email
    });

    const hashedPassword = admin.password;

    const adminMatched = await bcrypt.compare(password, hashedPassword);

    if(adminMatched){
        const token = jwt.sign({
            adminId : admin._id.toString(),
            adminName : admin.name
        }, JWT_SECRET);

        res.json({
            token : token,
            message : "You have been signed in"
        });
    }else{
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

});

adminRouter.use(auth);

adminRouter.post('/courses', async (req, res) => {
    // logic to create a course
    console.log("Course Creation Reached");
    

    const courseBody = z.object({
        courseName : z.string().min(5).max(100),
        courseDesc: z.string().min(3).max(300),
        coursePrice: z.number(),
        courseImgUrl: z.string()
    });

    const inputValidation = courseBody.safeParse(req.body);

    if(!inputValidation.success){
        console.log("Invalid Inputs");
        
        res.status(402).json({
            message: "Incorrect Inputs",
            error: inputValidation.error
        });
        return;
    }

    const courseName = req.body.courseName;
    const courseDesc = req.body.courseDesc;
    const coursePrice = req.body.coursePrice;
    const courseImgUrl = req.body.courseImgUrl;
    const author = req.user.adminName;
    const authorId = req.user.adminId;

    try{
        await courseModel.create({
            name : courseName,
            price : coursePrice,
            author : author,
            authorId : authorId,
            desc : courseDesc,
            img : courseImgUrl
        });
        res.status(200).json({
            message : "Course created"
        });
        return;
    }catch(e){
        console.log(e);
    }

    res.status(500).json({
        message : "Server Problem at admin/courses"
    })

});

adminRouter.put('/courses/:courseId', async (req, res) => {
    // logic to edit a course
    console.log("Edit Course Admin Reached");
    

    const courseId = req.params.courseId;

    const adminId = req.user.adminId;

    const name = req.body.courseName;
    const desc = req.body.courseDesc;
    const price = parseInt(req.body.coursePrice);
    const imgUrl = req.body.courseImgUrl;

    console.log(courseId);
    console.log(adminId);
    
    
    let result;
    try{
        result = await courseModel.findOneAndUpdate({
            _id : courseId,
            authorId : adminId
        }, {
            name: name, 
            desc: desc, 
            price: price, 
            img: imgUrl 
        })
    }catch(e){
        console.log("Error in admin course update");
        console.log(e);
    }

    if(result == null){
        res.status(401).json({
            message : "You cannot edit courses from different Author"
        });
    }else{
        res.json({
            message : "Success"
        });
    }
});

adminRouter.get('/courses', async (req, res) => {
    // logic to get all courses
    console.log("Admin get Courses reached");
    
    const adminId = req.user.adminId;
    // console.log(adminId);
    
    try{
        const courseList = await courseModel.find({
            authorId : adminId
        });
        // console.log(courseList);
        res.json({
            courseList : courseList
        });
    }catch(e){
        console.log("Something wrong with the database, error in admin course get request");
        console.log(e);    
        res.status(500);
    }
});


module.exports = {
    adminRouter : adminRouter
}
