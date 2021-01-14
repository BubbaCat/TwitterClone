const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        unique:false,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        unique:false,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"/img/profilePic.jpeg"
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
},{timestamps:true});

let User = mongoose.model('User', userSchema);
module.exports = User;