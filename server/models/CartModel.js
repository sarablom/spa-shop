const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: [true, "Ägar-id är obligatoriskt"]
    },
    token: {
        type: String,
        required: [true, "Token krävs för behörighet"]
    },
    cart: [{
        title: {
            type: String,
            required: [true, "Fyll i en titel"]
        },
        category: {
            type: String,
            required: [true, "Fyll i en kategori"]
        },
        description: {
            type: String,
            required: [true, "Fyll i en kort produktbeskrivning"]
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

