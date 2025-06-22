const mongoose=require("mongoose");
const marksschema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "Please add the id"],
        ref:"user"
    },
    subname:{
        type:String,
        required:[true, "Please add the sub name"]
    },
    marks1:{
        type:String,
        required:[true, "Please add the  marks"]
    },
    marks2:{
        type:String,
        required:[true,"Please add the marks"]
    }
},
{
    timestamps: true,
}
);
module.exports= mongoose.model("mark",marksschema);
