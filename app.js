const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fspath = require("path");
const app = express();
const dotenv = require("dotenv");
const passport = require("passport");
var csurf = require("csurf");
dotenv.config({ path: fspath.resolve(__dirname, "./.env") });
require("./utils/passport");
var session = require("express-session");
// For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ejs as view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/assets'));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

//Register All Routes
require("./routes/")(app);

// set port, listen for requests
// Handling Errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(500).json({
    message: err.message,
  });
});
module.exports = app;
