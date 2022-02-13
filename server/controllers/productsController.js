const ErrorResponse = require("../utils/errorRepsonse");
const Product = require("../models/ProductModel");

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (err) {
    next(err);
  }
}

async function getSingleProduct(req, res, next) {
  try {
    const productId = req.params._id;
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorResponse("Produkten hittades inte", 404));
    }

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProducts,
  getSingleProduct
};
