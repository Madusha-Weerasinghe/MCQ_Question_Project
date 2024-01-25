const markModel = require( "../models/mark.model");
const asyncHandler = require('express-async-handler');

const storeMark = asyncHandler(async (req, res) => {
    try {
      const { userid, mark, date, time } = req.body;
  
      console.log('Received Mark:', mark);
      console.log('Received date', date);
      console.log('Received Time', time);
  
      if (!mark || !date || !time || !userid) {
        return res.status(400).json({ error: 'Mark is required' });
      }
  
      const newMark = await markModel.create({
        userid: userid,
        mark:mark,
        date:date,
        time:time,
      });
  
      console.log('New Mark:', newMark);
  
      res.status(201).json({
        message: "Mark added successfully",
        mark: newMark
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  const getMarkById = asyncHandler(async(req, res) => {

    try{
      const u_id = req.params.userid;

      const mark = await markModel.find({userid:u_id});

      if(mark) {
        res.status(200).json(mark);
      }else {
        res.status(404).json({error: 'mark not found'});
      }

    }catch(error){
      console.error(error);
      res.status(500).json({error: 'internal server error' });
    }
  });

module.exports = {
    storeMark,
    getMarkById
};

