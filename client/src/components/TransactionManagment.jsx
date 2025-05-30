import React, { useEffect, useState } from "react";
import TransactionDialog from "./TransactionDialog";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { category, shortenString } from "../utils/helper";
import Loader from "./Loader";
import Filter from "./Filter";
import Pagination from "./Pagination";

const TransactionManagement = () => {
	const LIMIT = 5;
	const [transactions, setTransactions] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingTransaction, setEditingTransaction] = useState(null);
	const [formData, setFormData] = useState({
		description: "",
		amount: "",
		type: "",
		category: "",
		date: null,
	});
	const [refreshTransaction, setRefreshTransaction] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [fromFilterDate, setFromFilterDate] = useState("");
	const [toFilterDate, setToFilterDate] = useState("");
	const [filterCategory, setFilterCategory] = useState("");
	const [minAmount, setMinAmount] = useState("");
	const [maxAmount, setMaxAmount] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalTransactions, setTotalTransactions] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		const fetchAllTransactions = async () => {
			setIsLoading(true);
			try {
				const params = new URLSearchParams();

				if (fromFilterDate) params.append("fromDate", fromFilterDate);
				if (toFilterDate) params.append("toDate", toFilterDate);
				if (filterCategory) params.append("category", filterCategory);
				if (minAmount) params.append("minAmount", minAmount);
				if (maxAmount) params.append("maxAmount", maxAmount);
				if (currentPage) params.append("page", currentPage);
				params.append("limit", LIMIT);

				const res = await axios.get(
					`${BASE_URL}/transaction/all?${params.toString()}`,
					{
						withCredentials: true,
					}
				);

				setTransactions(res?.data?.data);
				setTotalTransactions(res?.data?.pagination.total);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
				setIsLoading(false);
			}
		};
		setIsLoading(false);
		setRefreshTransaction(false);
		fetchAllTransactions();
	}, [
		refreshTransaction,
		fromFilterDate,
		toFilterDate,
		filterCategory,
		minAmount,
		maxAmount,
		currentPage,
	]);

	const openModal = (transaction = null) => {
		setEditingTransaction(transaction);
		setFormData(
			transaction || {
				description: "",
				amount: "",
				type: "",
				category: "",
				date: null,
			}
		);
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
		setEditingTransaction(null);
		setFormData({ description: "", amount: "", type: "" });
	};

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(BASE_URL + `/transaction/delete/${id}`, {
				withCredentials: true,
			});
			setRefreshTransaction(true);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="max-w-4xl mx-auto mt-10 p-4">
			<h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
				Transaction Management
			</h2>

			<div className="flex items-center justify-between gap-6 mb-6">
				<Filter
					filterCategory={filterCategory}
					setFilterCategory={setFilterCategory}
					minAmount={minAmount}
					setMinAmount={setMinAmount}
					maxAmount={maxAmount}
					setMaxAmount={setMaxAmount}
					fromFilterDate={fromFilterDate}
					setFromFilterDate={setFromFilterDate}
					toFilterDate={toFilterDate}
					setToFilterDate={setToFilterDate}
				/>
				<button
					className="btn bg-indigo-100 text-indigo-600"
					onClick={() => openModal()}
				>
					Add Transaction
				</button>
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-[300px] w-full">
					<Loader />
				</div>
			) : (
				<table className="table w-full">
					<thead>
						<tr>
							<th>Date</th>
							<th>Type</th>
							<th>Category</th>
							<th>Amount</th>
							<th>Description</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{transactions.map((t) => (
							<tr key={t._id}>
								<td>{t.date.split("T")[0]}</td>
								<td>{t.type}</td>
								<td>{t.category}</td>
								<td>${t.amount.toFixed(2)}</td>
								<td>{shortenString(t.description, 20)}</td>
								<td className="space-x-2 flex">
									<button
										className="btn btn-sm btn-outline"
										onClick={() => openModal(t)}
									>
										Edit
									</button>
									<button
										className="btn btn-sm btn-outline text-red-500"
										onClick={() => handleDelete(t._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<Pagination
				currentPage={currentPage}
				totalTransactions={totalTransactions}
				onPageChange={(page) => setCurrentPage(page)}
			/>

			{isModalVisible && (
				<TransactionDialog
					editingTransaction={editingTransaction}
					formData={formData}
					setFormData={setFormData}
					closeModal={closeModal}
					setTransactions={setTransactions}
					setRefreshTransaction={setRefreshTransaction}
				/>
			)}
		</div>
	);
};

export default TransactionManagement;
