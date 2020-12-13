const mongoose = require("mongoose")
const Schema = mongoose.Schema

const signupSchema = new Schema({
    Name:{
        type:String,
        required:true,
        min:5,
        max:256
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        min:5,
        max:256
    },
    Email_Verified:{
        type:Boolean
    },
    OTP:{type:Number}
},
    {
        versionKey:false
    }
)

const signup = mongoose.model('signup' , signupSchema, 'signup')

module.exports = signup;