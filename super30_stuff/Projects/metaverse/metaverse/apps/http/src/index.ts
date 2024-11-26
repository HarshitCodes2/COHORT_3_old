import express from "express";
import { rootRouter } from "./routes/v1";
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(process.env.HTTP_PORT, () =>
  console.log(`Listening at ${process.env.HTTP_PORT}`)
);
