const models = require("../models");
const { Op } = require("sequelize");

class Product_Controller {
  //adding products to the database
  async createProduct(req, res) {
    try {
      if (!req.body.product_name || !req.body.product_description) {
        throw "Please provide all the required fields";
      }
      //adding product by using create method
      const newProduct = await models.product.create({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: req.body.product_image,
        product_quantity: req.body.product_quantity,
        product_status: req.body.product_status,
        product_discount: req.body.product_discount,
        product_discount_price: req.body.product_discount_price,
        product_Instock: req.body.product_Instock,
        product_outofstock: req.body.product_outofstock,
        product_rating: req.body.product_rating,
        product_review: req.body.product_review,
        category_id: req.body.category_id,
        subcategories_id: req.body.subcategories_id,
      });
      res.status(200).json({
        status: 200,
        data: newProduct,
        message: "Product added successfully",
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

  //getting all products from the database
  async getAllProduct(req, res) {
    try {
      let filter = [];

      if (req.query.category_id) {
        const categoryData = await models.category.findOne({
          where: {
            id: req.query.category_id,
          },
        });

        if (!categoryData) {
          throw "Please provide valid category id";
        }

        filter.push({
          category_id: req.query.category_id,
        });
      }

      if (req.query.subcategories_id) {
        filter.push({
          subcategories_id: req.query.subcategories_id,
        });
      }

      if (req.query.product_name) {
        filter.push({
          product_name: { [Op.like]: `%${req.query.product_name}%` },
          // [Op.or]: [
          //   {
          //     product_name: {
          //       [Op.iLike]: `%${req.query.product_name}%`,
          //     },
          //   },
          // ],
        });
      }

      const products = await models.product.findAll({
        where: {
          [Op.and]: filter,
        },
        limit: 10,
        offset: req.query.offset,
      });

      res.status(200).json({
        status: 200,
        data: products,
        message: "Products fetched successfully",
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

  //getting product by id from the database
  async getProductById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw "Please provide product id";
      }
      //getting product by id by using findById method
      const productById = await models.product.findOne({ where: { id } });
      res.status(200).json({
        status: 200,
        data: productById,
        message: "Product fetched successfully",
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

module.exports = new Product_Controller();
