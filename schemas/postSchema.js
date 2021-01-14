const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    content:{
        type:String,
        trim:true,
    },
    author:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref: 'User',
        }],
    pinned:Boolean,
},{timestamps:true});

let Post = mongoose.model('Post', PostSchema);
module.exports = Post;