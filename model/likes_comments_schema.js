const mongoose = require('mongoose');

const likeCommentSchema = new mongoose.Schema({
    Like:{
        type:Number,
        default:1
    },
    Comment:{
        type:String
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'signup'
    },
    title_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'title'
    }
},{
    versionKey:false
})

module.exports = mongoose.model('likes_and_comments' , likeCommentSchema , 'likes_and_comments')