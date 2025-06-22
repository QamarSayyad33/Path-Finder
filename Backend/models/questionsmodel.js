const mongoose=require("mongoose");
const questionsschema=mongoose.Schema({
    companyname:{
        type:String,
        required:[true, "Please add the Company name"]
    },
    question:{
        type: String,
        required:[true,"Please add the Questions"]
    },
    experience:{
        type:String,
        required:[true,"Please add experience"] 
       }
},
{
    timestamps: true,
}
);
module.exports= mongoose.model("questions",questionsschema);
