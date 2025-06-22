const express = require("express");
const router = express.Router();
const { getmarks, createmarks, getmark, updatemarks, deletemarks } = require("../controllers/markscontroller");
const validatetoken = require("../Middleware/validatetokenhandler");

router.use(validatetoken);
router.route('/')
    .get(getmarks)
    .post(createmarks);

router.route('/:id')
    .get(getmark)
    .put(updatemarks)
    .delete(deletemarks);

module.exports = router;
