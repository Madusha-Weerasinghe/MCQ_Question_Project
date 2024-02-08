
const markService = require("../services/mark.service");
const asyncHandler = require('express-async-handler');

const storeMark = asyncHandler(async (req, res) => {
    try {
        const { userid, mark, date, time } = req.body;

        console.log('Received Mark:', mark);
        console.log('Received date', date);
        console.log('Received Time', time);
        console.log('Received id', userid);

        const newMark = await markService.storeMark(userid, mark, date, time);

        console.log('New Mark:', newMark);

        res.status(201).json({
            message: "Mark added successfully",
            mark: newMark
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message }); // or 500 based on your preference
    }
});

const getMarkById = asyncHandler(async (req, res) => {
    try {
        const u_id = req.params.userid;

        const mark = await markService.getMarkById(u_id);

        if (mark) {
            res.status(200).json(mark);
        } else {
            res.status(404).json({ error: 'Mark not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    storeMark,
    getMarkById
};

