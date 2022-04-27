const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// установка схемы
const bookScheme = new Schema({
    title: String,
    author: String,
    genre: String,
    year: Number,
    total: Number,
    inStock: Number
});
module.exports = mongoose.model("Book", bookScheme);
