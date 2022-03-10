const { Router } = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const tokenHandler = require("../middleware/tokenHandler");

router.post("/", userController.createUser);

router.put("/:id", tokenHandler, userController.updateUser);

router.get("/", userController.getSingleUser);

module.exports = router;