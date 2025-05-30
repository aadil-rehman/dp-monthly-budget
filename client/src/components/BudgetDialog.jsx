import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const BudgetDialog = ({
	closeModal,
	isUpdate,
	summary,
	setRefreshBudget,
	selectedMonth,
	setSelectedMonth,
}) => {
	// const [selectedMonth, setSelectedMonth] = useState(() => {
	// 	const now = new Date();
	// 	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
	// 		2,
	// 		"0"
	// 	)}`;
	// });
	const [budgetAmount, setBudgetAmount] = useState(summary?.budgetAmount || "");
	const [actualExpense, setActualExpense] = useState(
		summary?.actualExpense || ""
	);

	console.log(selectedMonth);
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!selectedMonth && !budgetAmount && !actualExpense) return;

		try {
			const res = await axios.post(
				BASE_URL + "/budget/set",
				{ month: selectedMonth, budgetAmount, actualExpense },
				{ withCredentials: true }
			);
			setRefreshBudget(true);
		} catch (err) {
			console.error(err);
		}
		closeModal();
	};

	return (
		<div className="modal modal-open">
			<div className="modal-box">
				<h3 className="font-bold text-lg mb-4">
					{isUpdate ? "Update Budget" : "Set Budget"}
				</h3>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="month"
						className="input input-bordered w-full !outline-0"
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(e.target.value)}
					/>

					<input
						type="number"
						placeholder="Budget Amount"
						className="input w-full !outline-0"
						value={budgetAmount}
						onChange={(e) => setBudgetAmount(e.target.value)}
						required
					/>
					<input
						type="number"
						placeholder="Actual Expense"
						className="input w-full !outline-0"
						value={actualExpense}
						onChange={(e) => setActualExpense(e.target.value)}
						required
					/>

					<div className="modal-action">
						<button type="submit" className="btn bg-indigo-100 text-indigo-600">
							{isUpdate ? "Update" : "Add"}
						</button>
						<button type="button" className="btn" onClick={closeModal}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BudgetDialog;
