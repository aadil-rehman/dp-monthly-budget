const express = require("express");
const userAuth = require("../middleware/auth");
const Budget = require("../models/budget");

const budgetRouter = express.Router();

//Get budget for current month
budgetRouter.get("/fetch", userAuth, async (req, res) => {
	const month = req.query.month;
	const loggedinUser = req.user;

	try {
		const budget = await Budget.findOne({ userId: loggedinUser._id, month });

		if (!budget) {
			return res.json({ status: 1, message: "No budget Found", data: null });
		}

		res.json({
			status: 1,
			message: "Budget fetched successfully",
			data: budget,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

//set or update budget for a month
budgetRouter.post("/set", userAuth, async (req, res) => {
	const loggedinUser = req.user;
	const { month, budgetAmount, actualExpense } = req.body;

	try {
		const updatedBudget = await Budget.findOneAndUpdate(
			{ userId: loggedinUser._id, month },
			{ budgetAmount, actualExpense },
			{ upsert: true, new: true, runValidators: true }
		);

		res.json({
			status: 1,
			message: "Budget has been set/updated successfully",
			data: updatedBudget,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = budgetRouter;
