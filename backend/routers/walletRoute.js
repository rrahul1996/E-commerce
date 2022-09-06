const express = require("express");
const {
  updateWallet,
  getWalletBalance,
} = require("../controller/walletController");

const routers = express.Router();

routers.put("/updatewallet", updateWallet);
routers.get("/getwallet/:id", getWalletBalance);

exports.walletRoute = routers;
