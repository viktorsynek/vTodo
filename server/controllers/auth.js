const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;

	if (username === "" || email === "" || password === "") {
		return next(new ErrorResponse("Please fill in all fields", 400));
	}

	if (username.length < 3) {
		return next(
			new ErrorResponse("Username must be at least 3 characters long", 400)
		);
	}

	if (password.length < 6) {
		return next(
			new ErrorResponse("Password must be at least 6 characters long", 400)
		);
	}

	const existingUsername = await User.findOne({ username });
	if (existingUsername != null) {
		return next(new ErrorResponse("Username already in use", 400));
	}

	const existingEmail = await User.findOne({ email });
	if (existingEmail != null) {
		return next(new ErrorResponse("Email already in use", 400));
	}
	try {
		const user = await User.create({
			username,
			email,
			password,
		});
		sendTokenResponse(user, 200, res);
	} catch (error) {
		return next(new ErrorResponse("Email is not correctly formatted", 400));
	}
};

exports.login = async (req, res, next) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return next(
			new ErrorResponse("Please provide a username and password", 401)
		);
	}

	const user = await User.findOne({ username }).select("+password");
	if (!user) {
		return next(new ErrorResponse("Invalid credentials", 401));
	}

	const isMatch = await user.matchPassword(password);
	if (!isMatch) {
		return next(new ErrorResponse("Invalid credentials", 401));
	}

	sendTokenResponse(user, 200, res);
};

exports.getMe = async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({ success: true, data: user });
};

exports.resetPassword = async (req, res, next) => {
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.body.token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpiration: { $gt: Date.now() },
	});
	if (!user) {
		return next(new ErrorResponse("Invalid token", 401));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpiration = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
};

const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedJwtToken();
	const options = {
		httpOnly: true,
	};

	res
		.status(statusCode)
		.cookie("token", token, options)
		.json({ success: true, token });
};

exports.forgotPassword = async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new ErrorResponse("There is no user with that email", 401));
	}

	const resetToken = user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	const resetUrl = `${req.protocol}:/localhost:3000/resetpassword?token=${resetToken}`;
	try {
		await sendEmail({
			email: user.email,
			subject: "Password reset token",
			resetUrl,
		});

		res.status(200).json({ success: true, data: "Email sent" });
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiration = undefined;

		await user.save({ validateBeforeSave: false });
		return next(new ErrorResponse("Email could not be sent", 500));
	}
};
