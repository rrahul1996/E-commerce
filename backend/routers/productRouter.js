const express = require("express");
const { createProduct, getAllProduct, getProductById } = require("../controller/productController");


const routers = express.Router();

routers.post("/create_product", createProduct);
routers.get("/products", getAllProduct);
routers.get("/product_by_id/:id", getProductById);

exports.productRoutes = routers;
