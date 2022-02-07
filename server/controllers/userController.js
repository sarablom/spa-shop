const User = require("../models/UserModel");
const ErrorResponse = require("../utils/errorRepsonse");

async function createUser(req, res, next) {
    try {
        const { userName, password, firstName, lastName, address } = req.body;

        const user = await User.create({
            userName,
            password,
            firstName,
            lastName,
            address
        });

        res.status(201).json({
            success: true,
            user: user,
            token: user.getToken(),
        })
    } catch (err) {
        next(err);
    }
}

async function getAllUsers(req, res, next) {
	try {
		const users = await User.find({});

		res.status(200).json({
			success: true,
			users,
		});
	} catch (err) {
		next(err);
	}
}

async function getUserById(req, res, next) {
	try {
		const id = req.params.id;

		const user = await User.findById(id);

		if (!user) {
			return next(new ErrorResponse(`User not found`, 404));
		}

		res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createUser, getAllUsers, getUserById };