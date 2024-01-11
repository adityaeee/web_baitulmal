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
const madrasahRouter = require("./modules/madrasah/route/index");
const miskinInsidentilRouter = require("./modules/miskinInsidentil/route/index");
const guruDayahRouter = require("./modules/guruDayah/route/index");
const santriDayahRouter = require("./modules/santriDayah/route/index");
const santriDayahLuarRouter = require("./modules/santriDayahLuar/route/index");
const anakYatimRouter = require("./modules/anakYatim/route/index");
const disabilitasRouter = require("./modules/disabilitas/route/index");
const muallafRouter = require("./modules/muallaf/route/index");
const pelajarMiskinRouter = require("./modules/pelajarMiskin/route/index");
const santriMuallafRouter = require("./modules/santriMuallaf/route/index");
const waqafRouter = require("./modules/waqaf/route/index");
const pelajarRantauRouter = require("./modules/pelajarRantau/route/index");
const ibnuSabilRouter = require("./modules/ibnuSabil/route/index");
const clusteringRouter = require("./modules/clustering/route/index");
const stafRouter = require("./modules/staf/route/index");

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
app.use("/miskin-insidentil", miskinInsidentilRouter);
app.use("/guru-dayah", guruDayahRouter);
app.use("/santri-dayah", santriDayahRouter);
app.use("/santri-dayah-luar", santriDayahLuarRouter);
app.use("/anak-yatim", anakYatimRouter);
app.use("/disabilitas", disabilitasRouter);
app.use("/muallaf", muallafRouter);
app.use("/pelajar-miskin", pelajarMiskinRouter);
app.use("/santri-muallaf", santriMuallafRouter);
app.use("/madrasah", madrasahRouter);
app.use("/waqaf", waqafRouter);
app.use("/pelajar-rantau", pelajarRantauRouter);
app.use("/ibnu-sabil", ibnuSabilRouter);
app.use("/clustering", clusteringRouter);
app.use("/staf", stafRouter);

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
