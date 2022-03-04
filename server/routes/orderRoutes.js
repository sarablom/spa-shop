const { Router } = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");


router.post("/", orderController.placeOrder);

module.exports = router;
