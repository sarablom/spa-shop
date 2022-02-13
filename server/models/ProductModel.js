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
    imgUrl: String,
    price: String,
});

// productSchema.set("toJSON", {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString();
// 		delete returnedObject._id;
// 		delete returnedObject.__v;
// 	},
// });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;