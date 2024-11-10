const express = require("express");
const { apiRouter } = require("./routes/index");
const cors = require("cors")
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", apiRouter);


app.listen(process.env.PORT, () => {console.log(`The backend is live @ ${process.env.PORT}`)});
