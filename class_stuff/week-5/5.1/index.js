const express = require("express");
const app = express();



app.get("/", function (req, res){
    res.send("<h1>Calculator</h1>");
})

app.get("/add/:a/:b", function (req, res){
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);
    
    let sum = a + b;

    res.status(200).json({ sum : sum});
})

app.get("/substract/:a/:b", function (req, res){
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);

    let sub = a - b;

    res.status(200).json({ sub : sub});
})

app.get("/multiply/:a/:b", function (req, res){
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);

    let product = a * b;

    res.status(200).json({ product : product});
})

app.get("/divide/:a/:b", function (req, res){
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);

    let quotient = a / b;
    let remainder = a % b;

    res.status(200).json({ quotient : quotient, remainder : remainder});
})


app.listen(3000);
