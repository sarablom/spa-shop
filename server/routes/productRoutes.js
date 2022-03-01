const { Router } = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getSingleProduct);

router.post("/:id", productsController.updateProduct);

router.delete("/:id", productsController.deleteProduct);

module.exports = router;