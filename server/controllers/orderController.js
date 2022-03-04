const ErrorResponse = require("../utils/errorRepsonse");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

async function placeOrder(req, res, next) {
    try {
      const cart = req.body;

      cart.forEach(async item => {
        const product = await Product.findById(item._id);
        product.inStock = product.inStock - item.quantity;
        await product.save();
      })

  
      res.status(200).json({
        success: true,
        message: "Tack för ditt köp"
      })
  
    } catch (err) {
      next(err);
    }
  }

  module.exports = { placeOrder };