// start writing from here
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async function (req, res) {
    try {
        const data = await fs.promises.readFile("data.json", "utf8");
        const jsonData = data ? JSON.parse(data) : {}; // Handle empty file case
        res.json(jsonData);
    } catch (err) {
        console.error("Error reading or parsing data.json:", err);
        res.status(500).send("Error reading data");
    }
});


app.post("/", async function (req, res) {

    // console.log(req.body);

    let newState = req.body;
    let stateString = JSON.stringify(newState, null, 2);

    await fs.promises.writeFile("data.json", stateString);

    res.status(200);
});

// app.post('/data', async function (req, res) {
//     try {
//         const jsonData = req.body; // Access the JSON data sent from the frontend
//         console.log('Received JSON data:', jsonData);

//         let data = JSON.stringify(jsonData, null, 2);
//         // Save the data to a file
//         await fs.promises.writeFile('receivedData.json', data);

//         res.status(200).send('Data received successfully');
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Error processing data');
//     }
// });

app.listen(3000);

