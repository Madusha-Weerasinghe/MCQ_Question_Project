const express = require("express");
const router = express.Router();

const{
    storeMark,
    getMarkById
} = require("../controllers/mark.controller");

router.post("/add-mark", storeMark);
router.get("/get-mark-by-id/:userid",getMarkById);

module.exports = router;