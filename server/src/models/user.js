const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	emailId: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid Email address");
			}
		},
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
