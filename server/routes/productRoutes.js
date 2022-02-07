const { Router } = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");

//Get all products
router.get("/", productsController.getAllProducts);

//Get single product
router.get("/:id", productsController.getSingleProduct);

router.get("/:id", productsController.getSingleCart);

router.post("/cart/:id", productsController.createNewCart);

module.exports = router;