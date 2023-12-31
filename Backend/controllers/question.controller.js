const { model } = require('mongoose');
const QuestionModel = require('../models/Question.model');
const OptionsModel = require('../models/Options.model');
const asyncHandler = require('express-async-handler');


const createQuestionWithOptions = asyncHandler(async (req, res) => {
    const { question, options } = req.body;

    try {
        // Create Options first
        const createdOptions = await OptionsModel.insertMany(options);

        // Extract IDs of created options
        const optionIds = createdOptions.map(option => option._id);

        // Create Question and associate Option IDs
        const newQuestion = await QuestionModel.create({
            question,
            options: optionIds // Assign option IDs to the question
        });

        // Update the question field in each option to reference the new question
        await OptionsModel.updateMany({ _id: { $in: optionIds } }, { $set: { question: newQuestion._id } });

        res.status(201).json({
            message: 'Question created successfully',
            question: newQuestion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Fetch all data

const getAllQuestions = asyncHandler(async (req,res) => {
    const questions = await QuestionModel.find().populate('options');

    if (questions.length > 0) {
        res.status(200).json(questions);
    } else {
        res.status(404).json({ message: "No questions found" });
    }
 
});
const getAllQuestionIds = asyncHandler(async (req, res) => {
    try {
        const questionIds = await QuestionModel.find({}, '_id');

        if (questionIds.length > 0) {
            res.status(200).json(questionIds);
        } else {
            res.status(404).json({ message: "No question IDs found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const getQuestionById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;

        // Find the question by ID and populate the options
        const question = await QuestionModel.findById(id).populate('options');

        if (question) {
            res.status(200).json(question);
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


 const getAllOptions = asyncHandler (async (req,res) => {
    
    const response2 = await OptionsModel.find({});

   if(response2) {
       res.status(201).json(response2);
   } else {
       res.status(200).json("no question found");
   }
 });


const getOptionDetailsById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;

        // Find the option by ID
        const option = await OptionsModel.findById(id);

        if (option) {
            res.status(200).json(option);
        } else {
            res.status(404).json({ error: 'Option not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    createQuestionWithOptions,
    getAllQuestions,
    getAllOptions,
    getOptionDetailsById,
    getQuestionById,
    getAllQuestionIds
};
