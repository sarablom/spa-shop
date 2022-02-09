const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    ownerId: String,
    cart: [{
        title: {
            type: String,
            required: [true, "Fyll i en titel"]
        },
        imgUrl: String,
        price: String,
    }]    
})

cartSchema.set("toJSON", {
    transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

