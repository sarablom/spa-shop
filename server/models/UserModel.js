const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Du glömde ange ett användarnamn"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Du glömde ange ett lösenord"],
        minLength: [8, "Lösenordet måste vara minst 8 tecken långt"],
    },
    firstName: {
        type: String,
        required: [true, "Du glömde ange ditt namn"]
    },
    lastName: {
        type: String,
        required: [true, "Du glömde ange ditt efternamn"]
    },
    address: {
        type: String,
        required: [true, "Du glömde ange din adress"]
    }
});

// Run this function before user is saved/re-saved
userSchema.pre("save", async function (next) {
	const saltRounds = 10;

	// If the password wasn't modified, exit the function! Otherwise it would hash the already hashed password
	if (!this.isModified("password")) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, saltRounds);
	next();
});

userSchema.methods.checkPassword = function (enteredPassword, userPassword) {
	return bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.getToken = function () {
	return jwt.sign({ id: this._id }, process.env.REACT_APP_JWT_SECRET);
};

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		// returnedObject.id = returnedObject._id.toString();
		// delete returnedObject._id;
		// delete returnedObject.__v;
		delete returnedObject.password;
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;