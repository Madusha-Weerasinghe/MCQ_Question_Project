const markModel = require("../models/mark.model");

const storeMark =  (userid, mark, date, time) => {
    try {
        if (!mark || !date || !time || !userid) {
            throw new Error('Mark is required');
        }

        const newMark =  markModel.create({
            userid: userid,
            mark: mark,
            date: date,
            time: time,
        });

        return newMark;
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
};

const getMarkById =  (userid) => {
    try {
        const mark =  markModel.find({userid: userid});
        return mark || null;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

module.exports = {
    storeMark,
    getMarkById
};
