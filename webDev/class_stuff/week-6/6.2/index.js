const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "AnikaJain";
const app = express();

let users = [];

app.use(express.json());

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password
    });

    res.json({
        users : users
    })
});

app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(function (user){
        if(user.username == username){
            return true;
        }
    });

    if(!user){
        // alert("Incorrect Username");
        res.json({
            message : "Incorrect"
        });
    }

    let token;
    if(user.password == password){
        token = jwt.sign({
            username : username
        }, JWT_SECRET);
        res.json({
            token : token
        });
    }else{

        res.json({
            message : "Incorrect"
        });
    }

});

app.get("/get_info", function(req, res){

    const token = req.headers.token;

    let decodedUser;

    try{
        decodedUser = jwt.verify(token, JWT_SECRET);
    }catch(e){
        res.json({
            username : "Not Logged In"
        });
    }

    
    const user = users.find(function (u){
        if(u.username == decodedUser.username){
            return true;
        }
    });

    if(user){
        res.json({
            username : user.username,
            password : user.password,
        });
    }else{
        res.json({
            username : "Not Logged In"
        });
    }
});

app.listen(3000);
