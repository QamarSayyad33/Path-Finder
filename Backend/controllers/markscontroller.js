const asynchandler = require("express-async-handler");
const Mark = require("../models/marksmodel"); // Updated model name to "Mark"

const getmarks = asynchandler(async (req, res) => {
    const userMarks = await Mark.find({ user_id: req.users.id });
    res.status(200).json({userMarks});
});

const createmarks = asynchandler(async (req, res) => {
    const { subname, marks1:score1 ,marks2:score2 } = req.body;

    if (!subname || !score1 || !score2) {
        console.log("hi");
        console.log(subname);
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const newMark = await Mark.create({
        subname,
        marks1: score1,
        marks2:score2,
        user_id: req.users.id
    });

    res.status(201).json(newMark);
});

const getmark = asynchandler(async (req, res) => {
    const mark = await Mark.findById(req.params.id);
    
    if (!mark) {
        res.status(404);
        throw new Error("Mark not found");
    }

    res.status(200).json(mark);
});

const updatemarks = asynchandler(async (req, res) => {
    const mark = await Mark.findById(req.params.id);

    if (!mark) {
        res.status(404);
        throw new Error("Mark not found");
    }

    if (mark.user_id.toString() !== req.users.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user's marks");
    }

    const updatedMark = await Mark.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedMark);
});

const deletemarks = asynchandler(async (req, res) => {
    const mark = await Mark.findById(req.params.id);

    if (!mark) {
        res.status(404);
        throw new Error("Mark not found");
    }

    if (mark.user_id.toString() !== req.users.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other user's marks");
    }

    await mark.deleteOne({ _id: req.params.id });

    res.status(200).json(mark);
});

module.exports = { getmarks, createmarks, getmark, updatemarks, deletemarks };
