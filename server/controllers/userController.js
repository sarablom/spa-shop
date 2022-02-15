const User = require("../models/UserModel");
const ErrorResponse = require("../utils/errorRepsonse");

async function createUser(req, res, next) {
    try {
        const { userName, password, firstName, lastName, address, zipCode, city } = req.body;

        const user = await User.create({
            userName,
            password,
            firstName,
            lastName,
            address,
			zipCode,
			city
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

async function updateUser (req, res, next) {
	try {
		const userIdFromParams = req.params.id;
		const userIdFromToken = req.userId;
	
		const user = await User.findById(userIdFromParams);
	
		if (!user) {
			return next(new ErrorResponse("User not found", 404))
		}
	
		if (userIdFromParams !== userIdFromToken) {
			return next(new ErrorResponse("You are not authorized", 401));
		}
	
		const updates = req.body;
	
		const updatedUser = await User.findByIdAndUpdate(userIdFromToken, updates, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			success: true,
			user: updatedUser,
		})
	} catch (err) {
		next(err);
	}

}

module.exports = { createUser, getAllUsers, getUserById, updateUser };