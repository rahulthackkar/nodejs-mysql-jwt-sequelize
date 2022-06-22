const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
module.exports = function (app) {
  app.get("/api/public", userController.publicAccess);
  app.get("/api/user", [authJwt.verifyToken], userController.userAccess);
  app.get(
    "/api/moderator",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorAccess
  );
  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminAccess
  );
};
