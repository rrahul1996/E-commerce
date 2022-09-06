const models = require("../models");
class Category_Controller {
  //===========adding categories to the database==============

  async createCategory(req, res) {
    try {
      if (
        !req.body.category_name ||
        !req.body.category_description ||
        !req.body.category_image
      ) {
        throw "Please provide all the required fields";
      }
      //adding category by using create method
      const newsubcategory = await models.category.create({
        category_name: req.body.category_name,
        category_type: req.body.category_type,
        category_description: req.body.category_description,
        category_image: req.body.category_image,
      });
      res.status(200).json({
        status: 200,
        message: "Category added successfully",
        data: newsubcategory,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Internal server error",
      });
    }
  }

  //=============getting all categories from the database===========

  async getAllCategories(req, res) {
    try {
      //getting all categories by using findAll method
      const allCategories = await models.category.findAll({
        // include: [
        //   {
        //     model: models.subcategories,
        //     // attributes: [
        //     //   "subcategory_name",
        //     //   "subcategory_description",
        //     //   "subcategory_image",
        //     // ],
        //     attributes: {
        //       exclude: ["createdAt", "updatedAt"],
        //     },
        //   },
        //   {
        //     model: models.product,
        //     attributes: {
        //       exclude: ["createdAt", "updatedAt"],
        //     },
        //   },
        // ],
      });
      res.status(200).json({
        status: 200,
        message: "All categories",
        data: allCategories,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Internal server error",
      });
    }
  }

  //=============getting category by id from the database==========

  async getCategoryById(req, res) {
    try {
      //getting category by id by using findById method
      const id = req.params.id;
      if (!id) {
        res.status(400).json({
          message: "id is required",
        });
      }
      const CategoryById = await models.category.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: models.subcategories,
          },
        ],
      });
      res.status(200).json({
        status: 200,
        message: "Category by id",
        data: CategoryById,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Internal server error",
      });
    }
  }
}

module.exports = new Category_Controller();
