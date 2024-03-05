const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please add a username"],
		unique: true,
		minlength: 3,
		maxlength: 12,
	},
	email: {
		type: String,
		required: [true, "Please add a username"],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please add a valid email",
		],
	},
	password: {
		type: String,
		required: [true, "Please fill out your password"],
		minlength: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpiration: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) {
			return next();
		}

		const salt = await bcrypt.genSalt(10);

		if (!this.password) {
			throw new Error("Password is missing");
		}

		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.matchPassword = async function (givenPassword) {
	return await bcrypt.compare(givenPassword, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordExpiration = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model("user", UserSchema);
