const models = require("../models");
class ShippingAddressController {
  //===========adding createAddress to the database==============
  async createAddress(req, res) {
    try {
      if (
        !req.user.id ||
        !req.body.address ||
        !req.body.landmark ||
        !req.body.city ||
        !req.body.state ||
        !req.body.country ||
        !req.body.pincode ||
        !req.body.phone
      ) {
        throw "Please provide all the required fields";
      }

      //adding Address by using create method
      const newAddress = await models.shippingaddress.create({
        user_id: req.user.id,
        address: req.body.address,
        landmark: req.body.landmark,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode,
      });
      res.status(200).json({
        message: "Address added successfully",
        data: newAddress,
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

  //===========getting all Address from the database==============
  async getAddress(req, res) {
    try {
      const { id } = req.params;
      //getting all Address by using findAll method
      const alladdress = await models.shippingaddress.findOne({
        where: { user_id: id },
      });
      res.status(200).json({
        message: "All Address",
        data: alladdress,
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

module.exports = new ShippingAddressController();
