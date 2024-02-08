const express = require("express");
const router = express.Router();

const{
    storeMethod,
    getAllMethods
    
} = require("../controllers/method.controller");

router.post("/add-method", storeMethod);
router.get("/get-method",getAllMethods);


module.exports = router;