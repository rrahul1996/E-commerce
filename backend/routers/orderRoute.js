const express = require("express");
const { getOrder } = require("../controller/orderController");
const { createOrder } = require("../controller/walletController");

const routers = express.Router();

routers.post("/createorder", createOrder);
routers.get("/orders/:id", getOrder);

exports.orderRoute = routers;
