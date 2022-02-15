const User = require("../models/UserModel");
const ErrorResponse = require("../utils/errorRepsonse");

async function login (req, res, next) {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return next(
                new ErrorResponse("Wrong credentials", 400)
            );
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return next(new ErrorResponse("Wrong credentials", 404))
        }

        const isMatch = await user.checkPassword(password, user.password);

        if (!isMatch) {
            return next(new ErrorResponse("Wrong credentials", 401))
        }

        res.status(200).json({
            success:true,
            user: user,
            token: user.getToken(),
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { login };