const { verifySignUp } = require("../middleware");
const authController = require("../controllers/auth.controller");
const passport = require('passport')

module.exports = function (app) {
  app.get("/login", (req, res) => { res.render('login') });
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/api/auth/signin", authController.signin);
  app.get("/api/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
};