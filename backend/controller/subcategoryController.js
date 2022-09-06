const models = require("../models");
class SubCategories_Controller {
  //===========adding subcategories to the database==============

  async createSubCategory(req, res) {
    try {

      if(!req.body.category_id || !req.body.subcategory_name){
        throw "Please provide all the required fields";
      }
      
      //adding subcategory by using create method
      const newsubcategory = await models.subcategories.create({
        subcategories_name: req.body.subcategories_name,
        subcategories_type: req.body.subcategories_type,
        subcategories_description: req.body.subcategories_description,
        subcategories_image: req.body.subcategories_image,
        category_id: req.body.category_id,
      });
      res.status(200).json(newsubcategory);
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
  //=============getting all subcategories from the database===========

  async getAllSubCategories(req, res) {
    try {
      let filter = {};

      if (req.query.category_id) {
        const categoryData = await models.category.findOne({
          where: {
            id: req.query.category_id,
          },
        });
        if (!categoryData) {
          throw "Please provide valid category id";
        }
        filter.category_id = req.query.category_id;
      }

      //getting all subcategories by using findAll method
      const allSubCategories = await models.subcategories.findAll({
        limit: 10,
        offset: req.query.offset,
        where: filter,
      });
      res.status(200).json(allSubCategories);
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

  //=============getting subcategory by id from the database==========

  async getSubCategoryById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw "Please provide valid subcategory id";
      }
      //getting subcategory by id by using findById method
      const subCategoryById = await models.subcategories.findByPk(id, {
        include: [
          {
            model: models.product,
          },
        ],
      });
      res.status(200).json(subCategoryById);
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

module.exports = new SubCategories_Controller();
