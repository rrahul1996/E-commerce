const express = require("express");
const { unauth_userRoute } = require("./unauth_userRoute");
const routers = express.Router();

// router.post("/creates", createUser);

routers.use(unauth_userRoute);


module.exports = routers;
