const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    category: {
        type: String,
        required: [true, "Please enter a category"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description"]
    },
    inStock: {
        type: String,
        required: [true, "Please enter the number of products in stock"]
    },
    imgUrl: String,
    price: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;