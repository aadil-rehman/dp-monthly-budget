const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	type: {
		type: String,
		enum: ["income", "expense"],
		required: true,
	},
	amount: {
		type: Number,
		required: true,
		min: [0, "Amount must be positive"],
	},
	category: {
		type: String,
		required: true,
		enum: [
			"salary",
			"freelance",
			"rent",
			"groceries",
			"bills",
			"transportation",
			"loan emi",
			"medical expenses",
			"entertainment",
			"education expense",
			"others",
		],
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	description: {
		type: String,
		trim: true,
		maxlength: 200,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
