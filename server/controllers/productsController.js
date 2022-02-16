const ErrorResponse = require("../utils/errorRepsonse");
const Product = require("../models/ProductModel");
const { findByIdAndUpdate } = require("../models/ProductModel");

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
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const productId = req.params.id;
    const productToUpdate = await Product.findById(productId);

    if (!productToUpdate) {
      return next(new ErrorResponse("Product not found", 401))
    }

    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product: updateProduct
    })

  } catch (err) {
    next(err);
  }
}

async function deleteProduct (req, res, next) {
  try {
    const productId = req.params.id;
  
    const productToDelete = await Product.findById(productId);
  
    if (!productToDelete) {
      return next(new ErrorResponse("Product not found", 401))
    }
  
    await Product.findByIdAndDelete(productId);
  
    res.status(200).json({
      success: true,
      message: "Product deleted"
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
