const Book = require("../models/books");
exports.addBook = function (request, response){
  response.render("bookForm.hbs");
};
exports.deleteBook = function (request, response){
  const id = request.params.id;
  Book.deleteOne({_id: id}).then(function(){
    response.send(id);
  });
};
exports.getBooks = function(request, response){
  Book.find({}, function(err, allBooks){
    if(err) {
        console.log(err);
        return response.sendStatus(400);
    }
    response.render("index.hbs", {
        books: allBooks.map(book => book.toJSON())
    });
  });
};
exports.postBook= function(request, response){
  const mongoose = require("mongoose");

  const title = request.body.title;
  const author = request.body.author;
  const genre = request.body.genre;
  const year = request.body.year;
  const total = request.body.total;
  const inStock = request.body.total;
  const book = new Book({title, author, genre, year, total, inStock});
  book.save().then(()=> response.redirect("/"));
};
