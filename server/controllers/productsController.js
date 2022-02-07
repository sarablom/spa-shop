const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorRepsonse");
const Product = require("../models/ProductModel");
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
        const { title, category, description, imgUrl, price } = req.body;

        const cart = await Cart.create([{
            title,
            category,
            description,
            imgUrl,
            price
        }]);

        res.status(201).json({
            success: true,
            cart: cart,
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    getSingleCart,
    createNewCart
}