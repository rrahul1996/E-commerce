const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class userController {
  //===========adding users to the database==============
  // async createUser(req, res) {
  //   try {
  //     if (!req.body.name || !req.body.email || !req.body.password) {
  //       throw "Please provide all the required fields";
  //     }
  //     await models.user.findOne({
  //       where: {
  //         email: req.body.email,
  //       },
  //     });
  //     if (user) {
  //       throw "User already exists";
  //     }

  //     //adding subcategory by using create method
  //     const newUser = await models.user.create({
  //       first_name: req.body.first_name,
  //       last_name: req.body.last_name,
  //       user_name: req.body.user_name,
  //       email: req.body.email,
  //       password: req.body.password,
  //       phone_number: req.body.phone_number,
  //       city: req.body.city,
  //       total_orders: req.body.total_orders,
  //     });
  //     res.status(200).json(newUser);
  //   } catch (error) {
  //     res.status(500).json({
  //       status: 500,
  //       message:
  //         typeof error === "string"
  //           ? error
  //           : typeof error.message === "string"
  //           ? error.message
  //           : "Internal server error",
  //     });
  //   }
  // }

  //===============getting user signin from the database==============

  //user signup with email and password(hash)
  async Signup(req, res) {
    try {
      if (!req.body.user_name || !req.body.email || !req.body.password) {
        throw "Please provide all the required fields";
      }
      const user = await models.user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        throw "User already exists";
      }
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //saved user to database
      const newUser = await models.user.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashedPassword,
        phone_number: req.body.phone_number,
        city: req.body.city,
      });

      res.status(200).json({
        status: 200,
        data: newUser,
        message: "User created successfully",
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

  //user login with email and password(hash) and return token

  async Login(req, res) {
    try {
      //find user by email
      const user = await models.user.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      //compare password
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(404).json({ message: "Password is incorrect" });
      }
      //create token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      //saved token to database
      const { password, ...others } = user.dataValues;
      res.status(200).json({
        status: 200,
        ...others,
        token,
        message: "User logged in successfully",
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

  //===========getting all users from the database==============
  // async getAllUsers(req, res) {
  //   try {
  //     //getting all users by using findAll method
  //     const allUsers = await models.user.findAll();
  //     res.status(200).json(allUsers);
  //   } catch (error) {
  //     res.status(500).json({
  //       status: 500,
  //       message:
  //         typeof error === "string"
  //           ? error
  //           : typeof error.message === "string"
  //           ? error.message
  //           : "Internal server error",
  //     });
  //   }
  // }

  //===========getting user by id from the database==============
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw "Please provide user id";
      }
      //getting user by id by using findById method
      const user = await models.user.findById(id);
      res.status(200).json({
        status: 200,
        data: user,
        message: "User fetched successfully",
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

module.exports = new userController();
