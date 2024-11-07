//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
const app = express();
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const SALTROUNDS = process.env.SALTROUNDS;

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

// Admin routes
app.use('/admin', adminRouter);

// User routes
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
