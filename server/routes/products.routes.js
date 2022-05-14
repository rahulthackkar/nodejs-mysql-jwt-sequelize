const { authJwt } = require("../middleware");
const productController = require("../controllers/products.controller");
module.exports = function (app) {
  app.use(function (err, req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Add Product
  app.post(
    "/product",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.addProduct
  );
  // Get All Products
  app.get(
    "/product",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.getAllProducts
  );
  // Get Specific Product
  app.get(
    "/product/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.getProduct
  );
  // Delete Product
  app.delete(
    "/product/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.deleteProduct
  );
  // Update Product Details

  app.put(
    "/product/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.updateProduct
  );

};
