const express = require("express");
const {
  // createUser,
  // getAllUsers,
  getUserById,
  Signup,
  Login,
} = require("../controller/UserController");
const { createAddress, getAddress } = require("../controller/shippingAddressController");
const {
  createfriendReq,
  reqReceivedList,
  reqSendList,
  // acceptReq,
  cancelReq,
  // listFriends,
  Userfollowers,
  acceptOrreject,
} = require("../controller/userReqController");
const routers = express.Router();

routers.post("/signup", Signup);
routers.post("/signin", Login);

// routers.post("/createuser", createUser);
// routers.get("/getuser", getAllUsers);
routers.get("/getuser/:id", getUserById);

//shipping address routes
routers.post("/shippingaddress", createAddress);
routers.get("/shippingaddress/:id", getAddress);

//user request routes
routers.post("/createfriendreq", createfriendReq);
routers.get("/listreq/:id", reqReceivedList);
routers.get("/sendreq/:id", reqSendList);
routers.get("/cancelreq/:id", cancelReq);
routers.get("/req_acc_or_rej/:req_id/:rec_id/:status", acceptOrreject);
// routers.get("/reqrejected/:req_id/:rec_id", cancelReq);
routers.get("/followers/:id", Userfollowers);

exports.userRoute = routers;
