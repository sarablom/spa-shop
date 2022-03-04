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
	
		const { firstName, lastName, address, zipCode, city } = req.body
	
		const updatedUser = await User.findByIdAndUpdate(userIdFromToken, {
			firstName,
			lastName,
			address,
			zipCode,
			city
		}, {
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

module.exports = { createUser, updateUser };