const jwt = require("jsonwebtoken");
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
		res.status(500).json({
            success: false,
			error: true,
            message: err.code
        })
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

async function getSingleUser (req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		let userId = null;
		jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
			if (err) {
				return next(new ErrorResponse("Invalid token", 400))
			}

			userId = decoded.id;
		})

		const user = await User.findById(userId);

		if (!user) {
			return next(new ErrorResponse("User not found", 400));
		}

		res.status(200).json({
			success: true,
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				address: user.address,
				zipCode: user.zipCode
			}
		})

	} catch (err) {
		res.status(400).json({
            success: false,
			error: true,
            message: err
        })
		console.log(err);
		next(err);
	}
}

module.exports = { createUser, updateUser, getSingleUser };