const { verifySignUp } = require("../middleware");
const authController = require("../controllers/auth.controller");
const passport = require("passport");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // API Authentication using JWT
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    authController.signup
  );
  app.post("/api/auth/signin", authController.signin);
  // API Authentication using JWT
  // Google Authentication
  app.get("/login", (req, res) => {
    if (req.user != null) {
      res.redirect("/");
    }
    res.render("login.ejs", {
      user: req.user,
    });
  });
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );
  // Google Authentication

  // Logout Handler
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
