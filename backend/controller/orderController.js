const models = require("../models");

class order_Controller {
  //===========adding CheckOut_Controller to the database==============
  // async createOrder(req, res) {
  //   //adding Transacation to the database
  //   const t = await sequelize.transaction();

  //   try {
  //     if (!req.body.user_id || !req.body.shipping_address_id) {
  //       throw "Please provide all the required fields";
  //     }
  //     //adding newCheckOut by using create method
  //     const newOrder = await models.checkout.create(
  //       {
  //         user_id: req.body.user_id,
  //         shippingaddress_id: req.body.shippingaddress_id,
  //         order_number: req.body.order_number,
  //         payment_method: req.body.payment_method,
  //         payment_status: req.body.payment_status,
  //         order_status: req.body.order_status,
  //         totalPrice: req.body.totalPrice,
  //         delivery_fee: req.body.delivery_fee,
  //         final_amount: req.body.final_amount,
  //         expected_delivery_date: req.body.expected_delivery_date,
  //       },
  //       { transaction: t }
  //     );
  //     res.status(200).json({
  //       status: 200,
  //       data: newOrder,
  //       message: "CheckOut added successfully",
  //     });
  //     await t.commit();
  //   } catch (error) {
  //     //transaction is cancelled
  //     await t.rollback();
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
  //=============getting all newCheckOut from the database================

//   async getOrder(req, res) {
//     //adding Transacation to the database
//     const t = await sequelize.transaction();
//     try {
//       const id = { id: req.params.id };
//       //getting all checkout by using findAll method
//       const getOrder = await models.checkout.findAll(
//         {
//           include: [
//             {
//               model: models.user,
//               attributes: ["id", "first_name", "last_name", "email"],
//             },
//             {
//               model: models.shippingaddress,
//               attributes: ["id", "address", "city", "state", "pincode"],
//             },
//           ],
//         },
//         { transaction: t }
//       );

//       res.status(200).json(getOrder);
//       console.log(getOrder);
//       await t.commit();
//     } catch (error) {
//       console.log(error);
//       if (t) {
//         //transaction is cancelled
//         await t.rollback();
//       }
//       res.status(500).json(error);
//     }
//   }
// }

async getOrder(req, res) { 
    try { 
      const getOrder = await models.checkout.findAll({ 
        where: { 
          user_id: req.params.id, 
        }, 
        include: [  
          { 
            model: models.shippingaddress, 
            attributes: ["id", "address", "city", "state", "pincode"], 
          }, 
        ], 
      }); 
      res.status(200).json({ 
        status: 200, 
        data: getOrder, 
        message: "All CheckOut fetched successfully", 
      }); 
      // console.log(getOrder); 
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
}
module.exports = new order_Controller();
