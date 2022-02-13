const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    ownerId: String,
    cart: [{
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
    }]    
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

