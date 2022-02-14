const ErrorResponse = require("../utils/errorRepsonse");
const Cart = require("../models/CartModel");

async function getAllCarts(req, res, next) {
  try {
    const carts = await Cart.find({});
    res.status(200).json({
      success: true,
      carts: carts,
    });
  } catch (err) {
    next(err);
  }
}

async function getSingleCart(req, res, next) {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return next(new ErrorResponse("Kundkorg hittades inte", 404));
    }

    res.status(200).json({
      success: true,
      cart: cart,
    });
  } catch (err) {
    next(err);
  }
}

async function createNewCart(req, res, next) {
  try {
    const cart = req.body.cartArray;
    const user = req.body.userObject;

    if (!user) {
      return next(new ErrorResponse("Användare hittades inte", 404));
    }

    cart.ownerId = user._id;
    cart.cart = [
      {
        title: cart.title,
        category: cart.category,
        description: cart.description,
        inStock: cart.inStock,
        imgUrl: cart.imgUrl,
        price: cart.price
      },
    ];

    const newCart = await Cart.create(cart);

    res.status(201).json({
      success: true,
      cart: newCart,
      user: user,
    });
  } catch (err) {
    next(err);
  }
}

async function updateCart(req, res, next) {
  try {
    const cartId = req.params.id;
    //Visar innehållet i den tidigare kundkorgen
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return next(new ErrorResponse("Kundkorg hittades inte", 401)); 
    }

    console.log(req.body);

    const updateCart = await Cart.findByIdAndUpdate(cartId, {cart: req.body}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      cart: updateCart,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCarts,
  getSingleCart,
  createNewCart,
  updateCart,
};
