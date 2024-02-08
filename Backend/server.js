const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

app.use(cors());

const PORT = process.env.PORT || 8070;
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    // useUnifiedTopologyL:true,
    // useFindAndModify: false

});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb connection success");
})

//const optionRouter = require("./routes/options.route.js");
const questionRouter = require("./routes/question.route.js");
const markRouter = require("./routes/mark.route.js");
const methodRouter = require("./routes/method.route.js");

app.use("/questions",questionRouter);
//app.use("/options",optionRouter);
app.use("/mark",markRouter);
app.use("/method",methodRouter);

app.use('/question',require('./routes/question.route'))


app.listen(PORT, () => {
    console.log("server is up and running on port %d",PORT);
})