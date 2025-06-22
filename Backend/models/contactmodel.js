const mongoose=require("mongoose");
const contactschema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    name:{
        type:String,
        required:[true, "Please add the Contact name"]
    },
    email:{
        type:String,
        required:[true, "Please add the Contact email"]
    },
    phone:{
        type: String,
        required:[true,"Please add the phone number"]
    }
},
{
    timestamps: true,
}
);
module.exports= mongoose.model("contact",contactschema);
