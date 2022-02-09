const { Router } = require("express");
const router = new Router();
const cartsController = require("../controllers/cartsController");

router.get("/", cartsController.getAllCarts);

router.get("/:id", cartsController.getSingleCart);

router.post("/", cartsController.createNewCart);

router.put("/:id", cartsController.updateCart);

module.exports = router;