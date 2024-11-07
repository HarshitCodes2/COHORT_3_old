const express = require('express');

let users = [
    {
        name : "John",
        kidneys : [{
            healthy : false
        },{
            healthy:true
        }]
    }
];

const app = express();

app.use(express.json());

app.get("/", function(req, res){
    let userName = req.query.name;
    let details;
    users.forEach(function (user){
        let kidneyNo = 0;
        let healthyKidney = 0;
        let unHealthyKidney = 0;
        if(user.name == userName){
            console.log(user);
            user.kidneys.forEach(function (kidney){
                if(kidney.healthy){
                    healthyKidney++;
                }
                else{
                    unHealthyKidney++;
                }
                kidneyNo++;
            })

        }
        details = {
            "Number of Kidneys" : kidneyNo,
            "Number of healthy Kidneys" : healthyKidney,
            "Number of unhealthy Kidneys" : unHealthyKidney
        }
    })
    // res.status(404).send('Sorry, cant find that');
    res.send(details);
})

app.post("/", function(req,res){
    let isHealthy = req.body.isHealthy;

    let user = users[0];
    user.kidneys.push({
        healthy : isHealthy
    })

    res.json({
        msg : 'done'
    });
})

app.put("/", function(req,res){
    users.forEach(function (user) {
        user.kidneys.forEach(function (kidney){
            kidney.healthy = true;
        })
    })

    res.json({
        msg:"put done"
    })
})

app.delete('/', function(req, res){
    users.forEach(function (user){
            
            user.kidneys = user.kidneys.filter(kidney => kidney.healthy);
        })
    res.json({
        msg:"delete done"
    });
})


app.listen(3000);
