const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect(process.env.MONGO_URL); 

// Define mongoose schemas
const userSchema = new Schema({
// userSchema here
    name : String,
    email : {type : String, unique : true},
    password : String,
    coursesBought : [
        {
            courseId : {
                type: ObjectId,
                ref : 'Course'
            }
        }
    ]
});

const adminSchema = new Schema({
// adminSchema here
    name : String,
    email : {type : String, unique : true},
    password : String
});

const courseSchema = new Schema({
// courseSchema here
    name : String,
    price : Number,
    author : String,
    authorId: {
        type: ObjectId,
        ref: 'User'
    },
    desc : String,
    img : String
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
  

module.exports = {
    userModel : User,
    adminModel : Admin,
    courseModel : Course
};

