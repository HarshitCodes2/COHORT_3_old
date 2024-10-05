const express = require("express");
const dotenv = require("dotenv");
const fs = require('fs');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res)=> res.send("<h1>App Has started!</h1>"));

//  start writing your routes here

app.get("/add", function (req, res){
    let userFound = false;
    let userId = req.query.id;
    let taskName = req.query.taskName;
    fs.readFile("todo.json", "utf8", function (err, data){
        if(err){
        }else{
            if(data == null || data == undefined || data == ""){
                console.log("empty");
                data = {
                    uniqueId : 0,
                    users : []
                }
            }else{
                data = JSON.parse(data);
            }
            for(let user in data.users){
                if(data.users[user].id == userId){
                    data.users[user].tasks.push(taskName);
                    userFound = true;
                }
            }
            if(!userFound){
                data.uniqueId++;
                user = {
                    id : data.uniqueId,
                    tasks : []
                }
                user.tasks.push(taskName);

                data.users.push(user);

                // res.send(`Done, but id changed to ${data.uniqueId}`);
                // res.sendStatus(203);
            }
            const jsonData = JSON.stringify(data, null, 2);

            fs.writeFile("todo.json", jsonData, function (err) {
                if(err){
                    console.log(`Error is Found : ${err}`);
                }
            })
        }
    });
    res.send("Done");
});

app.get("/remove", function (req, res){
    let userFound = false;
    let taskFound = false;
    let userId = req.query.id;
    let taskName = req.query.taskName;
    fs.readFile("todo.json", "utf8", function (err, data){
        if(err){
        }else{
            if(data == null || data == undefined || data == ""){
                console.log("empty");
                data = {
                    uniqueId : 0,
                    users : []
                }
            }else{
                data = JSON.parse(data);
            }
            for(let user in data.users){
                if(data.users[user].id == userId){
                    userFound = true;
                    // console.log(data.users[user].tasks);

                    data.users[user].tasks = data.users[user].tasks.filter(function (task){
                        taskFound = true;
                        return (task != taskName);
                    });
                    // console.log(data.users[user].tasks);
                }
            }
            if(!userFound){
                console.log("User Not Found");
            }
            if(!taskFound){
                console.log("Task Not Found");
            }
            const jsonData = JSON.stringify(data, null, 2);

            fs.writeFile("todo.json", jsonData, function (err) {
                if(err){
                    console.log(`Error is Found : ${err}`);
                }
            })
        }
    });
    res.send("Done");
});

app.get("/print", function (req, res) {
    fs.readFile("todo.json", "utf8", function (err, data){
        if(err){
        }else{
            if(data == null || data == undefined || data == ""){
                // console.log("empty");
                data = {
                    uniqueId : 0,
                    users : []
                }
            }else{
                data = JSON.parse(data);
            }
            for(let user in data.users){
                console.log(data.users[user]);
            }
        }
    });
    res.send("Printed In Console");
})

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));
