const express = require("express");
const { Signup, Login } = require("../../controller/userController");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/validate");

const routers = express.Router();

routers.post("/signup", validateSignupRequest, isRequestValidated, Signup);
routers.post("/signin", validateSigninRequest, isRequestValidated, Login);

exports.unauth_userRoute = routers;
