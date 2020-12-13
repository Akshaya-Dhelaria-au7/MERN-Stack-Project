const mongoose = require("mongoose")
const Schema = mongoose.Schema

var categorySchema  = new Schema({
    Category:{
        type:String,
        required:true,
        unique:true
    },
    posted_by:{
        type:Schema.Types.ObjectId,
        ref:'signup'
    }
},
    {
        versionKey:false,
        timestamp:true
    }
)

module.exports = mongoose.model('category' , categorySchema , 'category')