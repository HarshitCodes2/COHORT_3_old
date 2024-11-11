const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

async function connectToDb() {
  await mongoose.connect(process.env.MONGO_URL);
}
connectToDb();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
});

const allItemsSchema = new Schema({
  imgUrl: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'AllItems',

  }]
});

const cartItemSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "AllItems",
    required: true,
  },
  count: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  items: [cartItemSchema],
});

const AllItems = mongoose.model("AllItems", allItemsSchema);
const User = mongoose.model("User", userSchema);
const Wishlist = mongoose.model("Wishlist", wishlistSchema);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = {
  AllItems: AllItems,
  User: User,
  Wishlist: Wishlist,
  Cart: Cart,
};
