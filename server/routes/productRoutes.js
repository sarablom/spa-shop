const { Router } = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");
const tokenHandler = require("../middleware/tokenHandler");

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getSingleProduct);

router.put("/:id", tokenHandler, productsController.updateProduct);

router.delete("/:id", tokenHandler, productsController.deleteProduct);

router.post("/", tokenHandler, productsController.createNewProduct);

module.exports = router;