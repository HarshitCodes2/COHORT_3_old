const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { userRouter } = require("./routes/userRoutes")
const { itemRouter } = require("./routes/allitemsRoutes")
const { wishlistRouter } = require("./routes/wishlistRoutes")
const { cartRouter } = require("./routes/cartRoutes")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/items", itemRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);

app.listen(process.env.PORT, console.log(`Listening at PORT:${process.env.PORT}`));
