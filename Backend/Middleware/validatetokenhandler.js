const asynchandler= require("express-async-handler");
const jwt=require("jsonwebtoken");



const validatetoken=asynchandler(async(req,res,next)=>{
    let token;
    let authheader=req.headers.Authorization || req.headers.authorization;
    if(authheader && authheader.startsWith("Bearer")){
        token=authheader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not Authorized");
            }
           req.users=decoded.users;
           next();

        });
        if(!token){
            res.status(401);
            throw new Error("user is not authorized or token is missing")
        }
    }
})
module.exports= validatetoken;
