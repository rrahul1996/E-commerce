const express = require("express");
const { createSubCategory, getAllSubCategories, getSubCategoryById } = require("../controller/subcategoryController");

const routers = express.Router();

routers.post("/create_subcategory", createSubCategory);
routers.get("/subcategories", getAllSubCategories);
routers.get("/subcategory_by_id/:id", getSubCategoryById);

exports.subcategoryRoutes = routers;
