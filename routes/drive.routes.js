const driveController = require("../controllers/gdrive.controller");

module.exports = function (app) {
  app.get("/googledrive/authorize", driveController.authorize);
  app.get("/googledrive/authorize/callback", driveController.authorizeCallback);
  app.get("/drivelogin", (req, res) => {
    res.render("gdrivelogin.ejs", {
      user: req.user,
    });
  });
  app.get("/mydrive", driveController.listFiles);
};
