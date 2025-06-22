const asynchandler = require("express-async-handler");
const questions = require("../models/questionsmodel"); // Model is correctly named "questions"

const getQuestions = asynchandler(async (req, res) => {
    const allQuestions = await questions.find();
    res.status(200).json({ questions: allQuestions });
});

const createQuestion = asynchandler(async (req, res) => {
    const { companyname, question ,experience} = req.body;

    if (!companyname || !question ||!experience) {
        res.status(400);
        throw new Error("Company name and question are required");
    }

    const newQuestion = await questions.create({
        companyname,
        question,
        experience
    });

    res.status(201).json(newQuestion);
});

const getQuestion = asynchandler(async (req, res) => {
    const question = await questions.findById(req.params.id);

    if (!question) {
        res.status(404);
        throw new Error("Question not found");
    }

    res.status(200).json(question);
});

const updateQuestion = asynchandler(async (req, res) => {
    const question = await questions.findById(req.params.id);

    if (!question) {
        res.status(404);
        throw new Error("Question not found");
    }

    const updatedQuestion = await questions.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedQuestion);
});

const deleteQuestion = asynchandler(async (req, res) => {
    const question = await questions.findById(req.params.id);

    if (!question) {
        res.status(404);
        throw new Error("Question not found");
    }

    await question.deleteOne();

    res.status(200).json({ message: "Question deleted" });
});

module.exports = { getQuestions, createQuestion, getQuestion, updateQuestion, deleteQuestion };
