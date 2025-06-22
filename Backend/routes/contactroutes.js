const express=require("express");
const router=express.Router();
const {getcontacts,createcontact,getcontact,updatecontact,deletecontact}= require("../controllers/contactcontroller");
const validatetoken = require("../Middleware/validatetokenhandler");

router.use(validatetoken);
router.route('/').get(getcontacts).post(createcontact);
router.route('/:id').get(getcontact).put(updatecontact).delete(deletecontact);

module.exports=router;