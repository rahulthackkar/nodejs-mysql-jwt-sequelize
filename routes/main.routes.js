module.exports = function (app) {
  // Landing Page
  app.get("/", (req, res) => {
    res.render("index.ejs", {
      user: req.user,
    });
  });
  app.get("/privacy-policy", (req, res) => {
    res.render("privacy-policy.ejs", {
      user: req.user,
    });
  });
};
