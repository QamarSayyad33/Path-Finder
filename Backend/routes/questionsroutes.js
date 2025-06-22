const express = require("express");
const router = express.Router();
const { getQuestions, createQuestion, getQuestion, updateQuestion, deleteQuestion  } = require("../controllers/questionscontroller");
router.route('/')
    .get(getQuestions)
    .post(createQuestion);

router.route('/:id')
    .get(getQuestions)
    .put(updateQuestion)
    .delete(deleteQuestion);

module.exports = router;
