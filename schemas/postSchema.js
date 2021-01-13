const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    content:{
        type:String,
        required:true,
        trim:true,
        },
    author:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    },
    Pinned:{
        type:Boolean,
    },
},{timestamps:true});

let Post = mongoose.model('Post', userSchema);
module.exports = Post;