const { model } = require('mongoose');
const QuestionModel = require('../models/Question.model');
const OptionsModel = require('../models/Options.model');
const asyncHandler = require('express-async-handler');


const createQuestionWithOptions = asyncHandler(async (req, res) => {
    const { question, imgurl, options } = req.body;

    try {
        // create Options 
        const createdOptions = await OptionsModel.insertMany(options);

        // take IDs from created options
        const optionIds = createdOptions.map(option => option._id);

        // Create Question and associate Option IDs
        const newQuestion = await QuestionModel.create({
            question,
            imgurl,
            options: optionIds,
            questionId: '' 
        });

        res.status(201).json({
            message: 'Question created successfully',
            question: newQuestion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Fetch all data

// const getAllQuestions = asyncHandler(async (req,res) => {
//     const response = await QuestionModel.find({});

//     if(response) {
//         res.status(201).json(response);
//     } else {
//         res.status(200).json("no question found");
//     }

 
// });

//Fetch all data



 







// const getAllOptions = asyncHandler (async (req,res) => {
//     const response2 = await OptionsModel.find({});

//     if(response2) {
//         res.status(201).json(response2);
//     } else {
//         res.status(200).json("no question found");
//     }
// });

module.exports = {
    createQuestionWithOptions,
    //getAllQuestions,
    //getAllOptions
};
