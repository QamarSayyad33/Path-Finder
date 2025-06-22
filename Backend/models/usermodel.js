const mongoose=require("mongoose");
const userschema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"please add the user email address"],
        unique:[true,"email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please add the user Password"]
    },

},{
    timestamp:true,
})
module.exports=mongoose.model("user",userschema);