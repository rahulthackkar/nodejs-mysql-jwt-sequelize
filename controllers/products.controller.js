const db = require("../models");
const Product = db.products;

// Add Product
exports.addProduct = (req, res) => {
  // Create a Product
  const product = {
    name: req.body.name,
    price: req.body.price,
  };
  Product.create(product)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Get All Products
exports.getAllProducts = (req, res) => {
  // Get All products
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Get Single Product By ID
exports.getProduct = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Product with id=" + id,
      });
    });
};

// Delete Product by ID
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((count) => {
      if (count == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting Product with id=" + id,
      });
    });
};
// Update Product Details
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id },
  })
    .then((count) => {
      if (count == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Product with id=" + id,
      });
    });
};
