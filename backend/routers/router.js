const express = require("express");
const router = express.Router();
// const { createUser } = require("../controller/UserController");
const { categoriesRouter } = require("./categoryRoute");
const { productRoutes } = require("./productRouter");
const { subcategoryRoutes } = require("./subCategoriesRoute");
const { userRoute } = require("./userRoute");
const { orderRoute } = require("./orderRoute");
const { walletRoute } = require("./walletRoute");
// router.post("/creates", createUser);

router.use(categoriesRouter);
router.use(subcategoryRoutes);
router.use(productRoutes);
router.use(userRoute);
router.use(orderRoute);
router.use(walletRoute);

module.exports = router;
