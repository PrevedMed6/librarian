exports.addBook = function (request, response){
  response.render("bookForm.hbs");
};
exports.getBooks = function(request, response){
  response.render("index.hbs", {
  // users: User.getAll()
  });
};
exports.postBook= function(request, response){
  const username = request.body.name;
  const userage = request.body.age;
  const user = new User(username, userage);
  user.save();
  response.redirect("/");
};
