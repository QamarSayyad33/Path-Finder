const asynchandler=require("express-async-handler");
const contact=require("../models/contactmodel")
const getcontacts= asynchandler(async (req,res)=>{
    const contacts=await contact.find({user_id: req.users.id});
    res.status(200).json({contacts});
});
const createcontact= asynchandler(async (req,res)=>{
    console.log(req.body);
    const{name, email, phone}=req.body;
    if(!name|| !email ||!phone){
        res.status(400);
        throw new Error("All Feilds are Mandatory");
    }
    const contacts= await contact.create({
        name,
        email,
        phone,
        user_id:req.users.id
    }) 
    console.log("id created");
    res.status(201).json(contacts);
})
const getcontact= asynchandler(async (req,res)=>{
    const contacts=await contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact Not found");
    }
    res.status(200).json(contacts);
})
const updatecontact= asynchandler(async (req,res)=>{
    const contacts=await contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact Not found");
    }
    if(contacts.user_id.toString()!== req.users.id){
        res.status(403);
        throw new Error("User doesn't have permission to update other user contacts");
    }
    const updatedcontacts=await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatedcontacts);
})
const deletecontact= asynchandler(async(req,res)=>{
    const contacts=await contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact Not found");
    }
    if(contacts.user_id.toString()!== req.users.id){
        res.status(403);
        throw new Error("User doesn't have permission to delete other user contacts");
    }
    await contacts.deleteOne({_id:req.params.id});
    res.status(200).json(contacts);
})
module.exports={getcontacts,createcontact,getcontact,updatecontact,deletecontact}