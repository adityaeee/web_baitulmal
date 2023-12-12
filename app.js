require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const busboyBodyParser = require("busboy-body-parser");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
const adminRouter = require("./modules/admin/route/index");
const authRouter = require("./modules/authentication/route/index");
const masyarakatRouter = require("./modules/masyarakat/route/index");
const gampongRouter = require("./modules/gampong/route/index");
const fakirRouter = require("./modules/fakir/route/index");
const miskinRouter = require("./modules/miskin/route/index");
const ghariminRouter = require("./modules/gharimin/route/index");
const santriBerprestasiRouter = require("./modules/santriBerprestasi/route/index");

var app = express();

// view engine setup
app.set("view engine", "ejs");
app.use(expressLayouts);

//Built-in middelware
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.multipart());
app.use(busboyBodyParser());

//method override
app.use(methodOverride("_method"));

// cookie setup
app.use(cookieParser());

//configurasi flash
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(logger("dev"));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/masyarakat", masyarakatRouter);
app.use("/gampong", gampongRouter);
app.use("/fakir", fakirRouter);
app.use("/miskin", miskinRouter);
app.use("/gharimin", ghariminRouter);
app.use("/santri-berprestasi", santriBerprestasiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
