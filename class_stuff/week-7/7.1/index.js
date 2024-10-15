const express = require('express');
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require("zod");
const SALTROUNDS = 10;


async function dbConnect() {
    try {
        await mongoose.connect("mongodb+srv://Harshit:BJyBHhTx2PZAHI7J@cluster0.n97ou.mongodb.net/todo-app-database");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }}

const app = express();

app.use(express.json());

app.post("/signup", async function(req, res){

    const passwordValidation = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );

    const signupBody = z.object({
        email : z.string().min(5).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(5).max(30).regex(passwordValidation, {message : "Password does not follow regex"})
    });

    const inputValidation = signupBody.safeParse(req.body);

    if(!inputValidation.success){
        res.json({
            message: "Incorrect Creds",
            error: inputValidation.error
        });
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    
    try{
        const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
        console.log(hashedPassword);
        try{
            await UserModel.create({
                email: email,
                password: hashedPassword,
                name: name
            });
        }catch(err){

            res.json({
                message: `${err.keyValue.email} Already in use`
            })
            return;
        }
    }catch(e){
        res.json({
            message : "Failed to create an Account",
            error : e
        });
    }

    res.json({
        message : "You have Signed Up"
    });
});

app.post("/signin", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
    })

    const hashedPassword = user.password;

    const userMatched = await bcrypt.compare(password, hashedPassword);
    
    console.log(userMatched);

    if(userMatched){
        const token = jwt.sign({
            userId: user._id.toString()
        }, JWT_SECRET);
        
        res.json({
            token: token,
            message: "You have been signed in"
        });
    }else{
        res.status(401).json({
            message: "Incorrect Credentials"
        });
    }

});

app.post("/todos", auth, async function(req, res){
    const desc = req.body.desc;
    const done = false;

    const userId = req.userId;

    const now = new Date();

    await TodoModel.create({
        title: desc,
        done: done,
        userId: userId,
        time: now.toISOString()
    });

    res.json({
        message: "todo created"
    });
});

app.get("/todos", auth, async function(req, res){
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    });

    console.log(todos);
    
    res.json({
        message: "Retrieval Success",
        todos: todos
    });
});

app.put("/todos", auth, async function(req, res){
    const userId = req.userId;
    const title = req.body.title

    try{
        await TodoModel.findOneAndUpdate({
            userId: userId,
            title: title
        }, {done : true});
    }catch(e){
        res.json({
            message: "Does not exist"
        });
        return;
    }
        
    res.json({
        message: "Success"
    });

})


async function startServer() {
    await dbConnect();
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}

startServer();

