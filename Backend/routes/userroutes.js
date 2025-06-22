const express=require("express");
const { registeruser, loginuser, currentuser } = require("../controllers/usercontroller");
const validatetoken = require("../Middleware/validatetokenhandler");
const router=express.Router();
router.post("/register",registeruser);
router.post("/login",loginuser)
router.get("/current",validatetoken,currentuser)
module.exports=router;
