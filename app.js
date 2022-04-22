const express = require("express");
const mongoose = require("mongoose");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
const bookRouter = require("./routes/bookRouter");

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
// устанавливаем настройки для файлов layout
app.engine("hbs", expressHbs.engine(
  {
      layoutsDir: "views/layouts",
      defaultLayout: "layout",
      extname: "hbs"
  }
))
// устанавливаем настройки для файлов частичных представлений
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

//маршрутизация
app.use("/", bookRouter);
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
