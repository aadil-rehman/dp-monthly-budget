const express = require("express");
const userAuth = require("../middleware/auth");
const Transaction = require("../models/transaction");

const transactionRouter = express.Router();

//Add new transaction
transactionRouter.post("/add/new", userAuth, async (req, res) => {
	const user = req.user;
	const userId = user._id;

	const { type, amount, category, date, description } = req.body;

	try {
		const transaction = new Transaction({
			userId,
			type,
			amount,
			category,
			date,
			description,
		});

		await transaction.save();

		res.status(200).json({
			status: 1,
			message: "Transaction added successfully!",
			data: transaction,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

//Edit a transaction
transactionRouter.patch("/edit/:transactionId", userAuth, async (req, res) => {
	try {
		const transactionId = req.params.transactionId;
		const userId = req.user._id;

		const allowedUpdates = [
			"type",
			"amount",
			"category",
			"date",
			"description",
		];

		let updateData = {};

		allowedUpdates.forEach((field) => {
			if (req.body[field]) {
				updateData[field] = req.body[field];
			}
		});

		const updatedTransaction = await Transaction.findOneAndUpdate(
			{ _id: transactionId, userId: userId },
			updateData,
			{ new: true, runValidators: true }
		);

		if (!updatedTransaction) {
			return res.status(404).json({
				status: 0,
				message: "Transaction not found!",
			});
		}

		res.json({
			status: 1,
			message: "Transaction updated successfully!",
			data: updatedTransaction,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

//Delete a transaction
transactionRouter.delete(
	"/delete/:transactionId",
	userAuth,
	async (req, res) => {
		try {
			const transactionId = req.params.transactionId;
			const userId = req.user._id;

			const deletedTransaction = await Transaction.findOneAndDelete({
				_id: transactionId,
				userId: userId,
			});

			if (!deletedTransaction) {
				return res
					.status(404)
					.json({ status: 0, message: "Transaction not found" });
			}

			res.json({ status: 1, message: "Transaction deleted successfully" });
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	}
);

//Get all the transactions for the loggedin user

transactionRouter.get("/all", userAuth, async (req, res) => {
	try {
		const loggedinUser = req.user;

		const allTransactionsByUser = await Transaction.find({
			userId: loggedinUser._id,
		});

		res.json({
			status: 1,
			message: "Transactions fetched successfully",
			data: allTransactionsByUser,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

//Get summary
transactionRouter.get("/summary", userAuth, async (req, res) => {
	try {
		const loggedinUser = req.user;

		const month = req.query.month; //YYYY-MM
		const [year, monthIndex] = month.split("-").map(Number);

		const curreDate = new Date(Date.now());
		const currMonth = curreDate.getMonth() + 1;

		let endDate = new Date();
		const startDate = new Date(year, monthIndex - 1, 2);

		if (monthIndex === currMonth) {
			endDate = new Date(year, monthIndex - 1, curreDate.getDate() + 1);
		} else {
			endDate = new Date(year, monthIndex, 1);
		}

		const transactions = await Transaction.find({
			userId: loggedinUser._id,
			date: { $gte: startDate, $lte: endDate },
		});

		const totalIncome = transactions
			.filter((t) => t.type === "income")
			.reduce((sum, t) => (sum = sum + t.amount), 0);

		const totalExpense = transactions
			.filter((t) => t.type === "expense")
			.reduce((sum, t) => (sum = sum + t.amount), 0);

		const balance = totalIncome - totalExpense;

		res.json({
			status: 1,
			message: "Transactions summary fetched successfully",
			summary: { month, totalIncome, totalExpense, balance },
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = transactionRouter;
