const express = require("express");
const bookController = require("../controllers/bookController.js");
const bookRouter = express.Router();

bookRouter.use("/create", bookController.addBook);
//bookRouter.use("/edit/:id", bookController.editBook);
//bookRouter.use("/delete/:id", bookController.deleteBook);
bookRouter.use("/books", bookController.getBooks);

module.exports = bookRouter;
