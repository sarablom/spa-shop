const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorRepsonse");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const Cart = require("../models/CartModel");

async function getAllProducts(req, res, next) {
    try {
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            products: products
        });

    } catch (err) {
        next(err);
    }
}

async function getSingleProduct (req, res, next) {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorResponse("Produkten hittades inte", 404))
        }

        res.status(200).json({
            success: true,
            product: product
        })

    } catch (err) {
        next(err);
    }
}

async function getSingleCart (req, res, next) {
    try {
        const cartId = req.params.id;
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return next(new ErrorResponse("Kundkorg hittades inte", 404))
        }

        res.status(200).json({
            success: true,
            cart: cart
        })

    } catch (err) {
        next(err);
    }
}

async function createNewCart (req, res, next) {
    try {
        const cart = req.body;

        const user = await User.findById(req.userId);

        if(!user) {
            return next(new ErrorResponse("Användare hittades inte", 404));
        }

        cart.ownerId = req.userId;
        cart.cart = [{ title: req.title, imgUrl: req.imgUrl, price: req.price }]

        const newCart = await Cart.create(cart);

        res.status(201).json({
            success: true,
            cart: newCart,
            user: user,
        })
    } catch (err) {
        next(err);
    }
}

async function updateCart (req, res, next) {
    try {
        const cartId = req.params.id;
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return next(new ErrorResponse("Kundkorg hittades inte", 401));
        }

        const updateCart = await Cart.findByIdAndUpdate(cartId, req.body, {
            new: true,
			runValidators: true,
        });

        res.status(200).json({
            success: true,
            cart: updateCart,
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    getSingleCart,
    createNewCart,
    updateCart
}