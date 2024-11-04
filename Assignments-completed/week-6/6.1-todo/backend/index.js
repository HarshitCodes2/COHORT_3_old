const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "12345678";
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

let users = [
    
]

// make a page for signup and another for signin

app.post("/signup", function(req, res){
    
    const username = req.body.username;
    const password = req.body.password;
    
    
    const newUser = {
        username : username,
        password : password,
        todos : []
    };
    
    users.push(newUser);

    console.log(users);
    
    res.status(200).sendFile("/Users/harshit/COHORT_3/assignments-incomplete/week-6/6.1-todo/frontend/signin.html");

});

app.post("/signin", function(req, res){

    const username = req.body.username;
    const password = req.body.password;
    
    const foundUser = users.find(function(u){
        if(u.username == username){
            return u;
        }
    });

    if(!foundUser){
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

    let token;
    if(foundUser.password == password){
        token = jwt.sign({
            username : username
        }, JWT_SECRET);
    }else{
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

    console.log(users);


    res.status(200).json({
        token : token,
        fileUrl : "/assignments-incomplete/week-6/6.1-todo/frontend/index.html"
    });
});

app.get("/todos", function(req, res){
    // authenticated end point
    // make a page to watch all todos and make it autheticated

    let token = req.headers.token;

    let decodedUser;

    try{
        decodedUser = jwt.verify(token, JWT_SECRET);
    }catch(e){
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

    const foundUser = users.find(function(u){
        if(u.username == decodedUser.username){
            return u;
        }
    });


    if(!foundUser){
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

    console.log(users);


    res.status(200).json({
        todoList : foundUser.todos
    });
});

app.post("/todos", function(req, res){

    let token = req.headers.token;

    let decodedUser;
    try{
        decodedUser = jwt.verify(token, JWT_SECRET);
    }catch(e){
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

    const foundUser = users.find(function(u){
        if(u.username == decodedUser.username){
            return u;
        }
    });


    if(!foundUser){
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

    let todos = foundUser.todos;

    let taskId = todos.length + 1;
    let task = req.body.task;

    let newTodo = {
        id : taskId,
        task : task
    };

    todos.push(newTodo);

    console.log(users);


    res.status(200).json({
        message : "Success"
    });
});

app.post("/delete", function(req, res){

    let token = req.headers.token;

    console.log(token);
    
    let decodedUser;
    try{
        decodedUser = jwt.verify(token, JWT_SECRET);
    }catch(e){
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

    console.log(decodedUser);


    const foundUser = users.find(function(u){
        if(u.username == decodedUser.username){
            return u;
        }
    });


    if(!foundUser){
        res.status(401).json({
            message : "Incorrect Credentials"
        });
    }

    let todos = foundUser.todos;
    let delTaskId = req.body.id;

    todos = todos.filter(function (todo){
        if(todo.id != delTaskId){
            return true;
        }
    });

    console.log(todos);

    foundUser.todos = todos;

    console.log(foundUser.todos);

    console.log(users);
    

    res.status(200).json({
        message : "Success"
    });

});

app.listen(3001);