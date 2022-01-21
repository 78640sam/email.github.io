const express = require("express");

const productController = require("./controllers/product.controller");
const userController = require("./controllers/user.controller");
const adminController = require("./controllers/admin.controller");

const app = express();

app.use(express.json());

app.use("/products", productController);
app.use("/users", userController);
  app.use("/admin", adminController);


module.exports = app;
