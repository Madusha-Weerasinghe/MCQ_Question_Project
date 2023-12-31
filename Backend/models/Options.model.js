const mongoose = require("mongoose");

const OptionSchema = mongoose.Schema(
{
    OptionText: {
        type: String,
        required: true
    },

    OptionMark: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Option", OptionSchema);