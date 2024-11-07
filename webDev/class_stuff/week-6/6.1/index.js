const express = require('express');
const jwt = require('jsonwebtoken');
JWT_SECRET = "HarshitCodes2";
const app = express();

app.use(express.json());

let users = [];

function authenticateUser(req, res, next){
    const token = req.headers.token;

    if(token){
        const decodedUser = jwt.verify(token, JWT_SECRET);

        for(let user of users){
            if(user.username == decodedUser.username){
                // res.json({
                //     username : user.username
                // });
                req.user = user;
                next();
            }
        }
    }else{
        res.json({
            message : "User not Logged in"
        });
    }
}

app.post("/signup", function(req, res) {

   const username = req.body.username;
   const password = req.body.password;

   users.push({
      username : username,
      password : password
   });

   res.json({
      message : "You can now sign in"
   })

});


app.post("/signin", function(req, res) {
    
   const username = req.body.username;
   const password = req.body.password;

   const user = users.find(function (u){
      if(u.username === username){
         return true;
      }
   });

   let token;

   if(user.password == password){
      token = jwt.sign({
         username : username
      }, JWT_SECRET);
   }
   
   if(token){
      res.json({
         token : token
      })
   }else{
      res.json({
         message : "Incorrect Info"
      })
   }

});


app.get("/me", authenticateUser, function (req, res){
//    const token = req.headers.token;
//    const decodedUser = jwt.verify(token, JWT_SECRET);
   
//    let foundUser;
   
//    for(let user of users){
//       if(decodedUser.username == user.username){
//          foundUser = user;
//       }
//    }

//    if(foundUser){
//       res.json({
//          username : foundUser.username,
//          password : foundUser.password
//       })
//    }else{
//       res.json({
//          message : "Incorrect Token"
//       })
//    }

    const authenticatedUser = req.user;


    res.json({
        message : "User is authenticated",
        user : authenticatedUser
    });
})


app.listen(3000, () => {console.log("Listening at 3000");});
