const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/sum", function (req, res) {
    let a = parseInt(req.body.a);
    let b = parseInt(req.body.b);

    res.json({
        answer : a + b
    })
})

app.listen(3000);

// const express = require("express");

// const app = express();

// app.get("/sum", function(req, res) {
//     console.log(req.name);
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);

//     res.json({
//         ans: a + b
//     })
// });

// app.listen(3000);