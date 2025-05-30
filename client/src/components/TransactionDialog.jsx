import { category } from "../utils/helper";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const TransactionDialog = ({
	editingTransaction,
	formData,
	setFormData,
	closeModal,
	setTransactions,
	setRefreshTransaction,
}) => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { description, amount, type, date, category } = formData;

		if (!description || !amount || !type || !date || !category) return;

		try {
			const isEditing = Boolean(editingTransaction);
			const url = isEditing
				? `${BASE_URL}/transaction/edit/${editingTransaction._id}`
				: `${BASE_URL}/transaction/add/new`;

			const method = isEditing ? "patch" : "post";

			const res = await axios[method](
				url,
				{ description, amount, type, date, category },
				{ withCredentials: true }
			);

			setRefreshTransaction(true);
		} catch (err) {
			console.error(err);
		}
		closeModal();
	};

	console.log(formData);

	return (
		<div className="modal modal-open">
			<div className="modal-box">
				<h3 className="font-bold text-lg mb-4">
					{editingTransaction ? "Edit Transaction" : "Add Transaction"}
				</h3>
				<form onSubmit={handleSubmit} className="space-y-4">
					<select
						className="select !outline-0 w-full"
						value={formData.type}
						onChange={(e) => setFormData({ ...formData, type: e.target.value })}
						required
					>
						<option value="">Select Type</option>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>
					<select
						className="select !outline-0 w-full"
						value={formData.category}
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
						required
					>
						<option value="">Select Category</option>
						{category.map((c) => (
							<option value={c} key={c}>
								{c}
							</option>
						))}
					</select>
					<input
						type="date"
						className="input input-bordered w-full !outline-0"
						value={formData?.date?.split("T")[0]}
						onChange={(e) => setFormData({ ...formData, date: e.target.value })}
					/>

					<input
						type="text"
						placeholder="Description"
						className="input w-full !outline-0"
						value={formData.description}
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
						required
					/>
					<input
						type="number"
						placeholder="Amount"
						className="input w-full !outline-0"
						value={formData.amount}
						onChange={(e) =>
							setFormData({ ...formData, amount: e.target.value })
						}
						required
					/>

					<div className="modal-action">
						<button type="submit" className="btn bg-indigo-100 text-indigo-600">
							{editingTransaction ? "Update" : "Add"}
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

export default TransactionDialog;
