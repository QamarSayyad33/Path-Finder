const asynchandler=require("express-async-handler");
const user=require("../models/usermodel");
const jwt= require("jsonwebtoken");
const bcrypt=require("bcrypt");
const registeruser= asynchandler(async (req,res)=>{
    const{username,email,password}=req.body;
    if(!email||!password){
        res.status(400);

        throw new Error("All Feilds are Mandatory");
    }
    const useravailable=await user.findOne({email});
    if(useravailable){
        res.status(400);
        throw new Error("User already registered");
    }
    const hashedpassword = await bcrypt.hash(password,10);
    console.log("hashed password",hashedpassword);
    const users= await user.create({
        email,
        password:hashedpassword,
    })
    console.log(`user created${users}`);
    if(users){
        res.status(201).json({_id: users.id,email:users.email});
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message: "register the user"});
});
const loginuser= asynchandler(async (req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fills are mandatory");
    }
    const users=await user.findOne({ email});
    if(users && (await bcrypt.compare(password,users.password))){
        const accessToken=jwt.sign({
            users:{
                email:users.email,
                id:users.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    );
    res.status(200).json({accessToken});
    }
    else{
        res.status(401)
        throw new Error("email or password not valid");
    }

});
const currentuser= asynchandler(async (req,res)=>{
    res.json(req.users);
});

module.exports={registeruser,loginuser,currentuser}