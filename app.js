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
      extname: "hbs",
      helpers: {
        select: function(value, options) {
          return options.fn(this)
            .split('\n')
            .map(function(v) {
              var t = 'value="' + value + '"'
              return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
            })
            .join('\n')
        },
    }
  }
))
// устанавливаем настройки для файлов частичных представлений
hbs.registerPartials(__dirname + "/views/partials");

//маршрутизация
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(express.static(__dirname + '/public'));
app.use("/", bookRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

mongoose.connect("mongodb://mongo:27017/booksdb", { useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
