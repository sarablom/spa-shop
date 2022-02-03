const { Router } = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");

//Get all products
router.get("/", productsController.getAllProducts);

//Get single product
router.get("/:id", productsController.getSingleMeetup);