const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
    title: String,
    entry: String
});
mongoose.model("Diary", diarySchema);