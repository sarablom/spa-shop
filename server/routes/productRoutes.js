const { Router } = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");

//Get all products
router.get("/", productsController.getAllProducts);

//Get single product
router.get("/:id", productsController.getSingleProduct);

router.get("/carts", productsController.getAllCarts);

router.get("cart/:id", productsController.getSingleCart);

router.post("/cart", productsController.createNewCart);

router.put("cart/:id", productsController.updateCart);

module.exports = router;