const { sequelize } = require("../models");
const models = require("../models");
class walletController {
  //===========getting all users from the database==============

  async updateWallet(req, res) {
    let t = await sequelize.transaction();

    try {
      const { id, amount } = req.body;

      if (!id || !amount) {
        throw "Please provide user_id and amount";
      }

      // updating user wallet balance
      await models.user.increment("user_wallet_balance", {
        by: amount,
        where: { id: id },
        transaction: t,
      });

      await models.walletbalance.create(
        {
          user_id: id,
          amount: amount,
          topup_date: new Date(),
          topup_type: "credit",
          topup_status: "success",
        },
        {
          transaction: t,
        }
      );

      const userData = await models.user.findOne({
        where: {
          id,
        },
        transaction: t,
        lock: true,
      });

      // creating the transaction
      await t.commit();

      res.status(200).json({
        status: 200,
        data: userData,
        message: "Order Created successfully",
      });
    } catch (error) {
      //transaction failed
      if (t) await t.rollback();
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

  //===========getting user by id from the database==============
  async getWalletBalance(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw "Please provide user id";
      }
      //getting user by id by using findById method
      const userBal = await models.user.findOne({
        where: { id },
        attributes: ["user_wallet_balance"],
      });

      res.status(200).json({
        status: 200,
        data: userBal,
        message: "User balance fetched successfully",
      });
    } catch (error) {
      console.log(error);
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

  async getWalletTransaction(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw "Please provide user id";
      }
      //getting user by id by using findById method
      const userBal = await models.walletbalance.findOne({
        where: { user_id: id },
      });

      res.status(200).json({
        status: 200,
        data: userBal,
        message: "User balance fetched successfully",
      });
    } catch (error) {
      console.log(error);
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

  async createOrder(req, res) {
    try {
      const {  products } = req.body;
      // const { userId } = req.user.id;
      const { userId } = req.body;
      console.log(userId)
      console.log(products)
      if (!userId || (typeof products != "array" && !products.length)) {
        throw "Please provide valid data";
      }
      //total sum of products
      const totalAmount = products.map( (item) => item.price).reduce((acc, curr) => acc + curr, 0);

      //getting user by id by using findById method
      const userData = await models.user.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (!userData) {
        throw "Please provide valid userId";
      }
      //checking if user has sufficient balance
      const userWalletBalance = userData.user_wallet_balance;

      //checking if user has sufficient balance
      if (userWalletBalance < totalAmount) {
        throw "Not enough balance";
      }


      //checking if products are available in the database
      for (let productItem of products) {
        if (!productItem.id) {
          throw "Please provide valid product id";
        }

        const productData = await models.product.findOne({
          where: {
            id: productItem.id,
          },
        });

        if (!productData) {
          throw "Please provide valid product id";
        }
      }

      // order create
      // user wallet ba;ance decrement
      // user wallet balance transaction create

      let t = await sequelize.transaction();
      let newOrder;

      try {
        newOrder = await models.checkout.create(
          {
            user_id: req.user.id,
            shippingaddress_id : req.body.shippingaddress_id,
            // products: JSON.stringify(products),
            products : products,
            final_amount: totalAmount,
            order_status: "completed"
          },
          {
            transaction: t,
          }
        );

        await models.user.decrement("user_wallet_balance", {
          by: totalAmount,
          where: { id: userId },
          transaction: t,
        });

        const userData = await models.user.findOne({
          where: {
            id: userId,
          },
          transaction: t,
          lock: true,
        });

        res.status(200).json({
          status: 200,
          data: userData,
          message: "order created successfully",
        });

        t.commit();
        return
      } catch (e) {
        if(t){
          t.rollback();
        }
        throw e;
      }

      res.status(200).json({
        status: 200,
        data: newOrder,
        message: "User order created successfully",
      });
    } catch (error) {
      res.json({
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

module.exports = new walletController();
