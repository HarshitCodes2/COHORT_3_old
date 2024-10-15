const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const UserSchema = new Schema({
    email : {type : String, unique : true},
    password : String,
    name : String
});

const TodoSchema = new Schema({
    userId : {type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title : String,
    done : Boolean,
    time : String
});


const UserModel = mongoose.model('users', UserSchema);
const TodoModel = mongoose.model('todos', TodoSchema);


module.exports = {
    UserModel,
    TodoModel
}
