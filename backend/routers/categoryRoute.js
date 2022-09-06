const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
} = require("../controller/categoryController");

const routers = express.Router();

routers.post("/create_category", createCategory);
routers.get("/categorys", getAllCategories);
routers.get("/category_by_id/:id", getCategoryById);

exports.categoriesRouter = routers;
