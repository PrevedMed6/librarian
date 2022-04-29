const Book = require("../models/books");
exports.addBook = function (request, response){
  response.render("bookForm.hbs");
};
exports.editBook = function (request, response){
  const id = request.params.id;
  Book.findOne({_id: id}).then(function(book){
      response.render("bookForm.hbs", {
      book: book.toJSON()
    });
  });
};
exports.deleteBook = function (request, response){
  const id = request.params.id;
  Book.deleteOne({_id: id}).then(function(){
    response.send(id);
  });
};
exports.getBooks = function(request, response){
  Book.find({}).then(function(allBooks){
        response.render("index.hbs", {
        books: allBooks.map(book => book.toJSON())
    });
  });
};
exports.postBook= function(request, response){
 console.log('Тут');
 const id = request.body._id;
 const title = request.body.title;
 const author = request.body.author;
 const genre = request.body.genre;
 const year = request.body.year;
 const total = request.body.total;
 const inStock = request.body.total;
 const book = {title:title, author:author, genre:genre, year:year, total:total, inStock:inStock};
 if(id)
 {
  Book.findOneAndUpdate({ _id: id },book).then(()=> response.redirect("/"));
 }
 else
 {
  Book.create(book).then(()=> response.redirect("/"));
 }
};
