

const errorHandler = (err, res) => {
	let error = { ...err };
	console.log(error);

	res.status(error.statusCode || 500).json({
		success: false,
		error: "Server error, are you sending the correct information to the database?",
	});
};

module.exports = errorHandler;