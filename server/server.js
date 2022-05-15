const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const csrf = require('csurf');
const fspath = require("path");
const app = express();
const dotenv = require("dotenv");
var csrfProtection = csrf({ cookie: true });
const passport = require('passport')

dotenv.config({ path: fspath.resolve(__dirname, "../.env") });
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

// ejs as view engine
app.set('view engine', 'ejs');
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());
const db = require("./models"); 
const Role = db.role;
db.sequelize.sync().then(() => {
  console.log("Drop and Resync Db");
  // initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

//Register All Routes
// simple route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to Nodejs Application." });
  res.render('index');
});
app.get("/api/auth/google",  passport.authenticate('google', { scope: ['profile','email'] }));

require("./routes/")(app);

// set port, listen for requests
console.log(`Server is running on port ` + process.env.NODE_APP_PORT);
// Handling Errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const PORT = process.env.NODE_APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});