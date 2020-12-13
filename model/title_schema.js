const mongoose = require("mongoose")
const Schema = mongoose.Schema

var titleSchema  = new Schema({
    Title:{
        type:String,
        require:true
    },
    Link:{
        type:String,
        require:true,
        unique:true
    },
    posted_by:{
        type:Schema.Types.ObjectId,
        ref:"signup"
    },
    category_id:{
        type:Schema.Types.ObjectId,
        ref:'category'
    }
},
    {
        versionKey:false,
        timestamp:true
    }
)

module.exports = mongoose.model('title' , titleSchema , 'title')