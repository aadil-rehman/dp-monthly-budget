import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import BudgetDialog from "./BudgetDialog";

const BudgetManagement = () => {
	const [summary, setSummary] = useState(null);
	const [selectedMonth, setSelectedMonth] = useState(() => {
		const now = new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
			2,
			"0"
		)}`;
	});
	const chartRef = useRef();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [refreshBudget, setRefreshBudget] = useState(false);

	useEffect(() => {
		const fetchSummary = async () => {
			try {
				const res = await axios.get(
					`${BASE_URL}/budget/fetch?month=${selectedMonth}`,
					{
						withCredentials: true,
					}
				);
				setSummary(res?.data?.data);
			} catch (err) {
				console.error("Failed to fetch budget summary:", err);
			}
		};
		setRefreshBudget(false);
		fetchSummary();
	}, [selectedMonth, refreshBudget]);

	console.log(summary);

	useEffect(() => {
		if (summary) {
			drawChart(summary);
		}
	}, [summary]);

	const drawChart = ({ budgetAmount, actualExpense }) => {
		d3.select(chartRef.current).selectAll("*").remove();

		const data = [
			{ label: "Budget", value: budgetAmount },
			{ label: "Expense", value: actualExpense },
		];

		const margin = { top: 20, right: 20, bottom: 40, left: 60 };
		const width = 400 - margin.left - margin.right;
		const height = 300 - margin.top - margin.bottom;

		const svg = d3
			.select(chartRef.current)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		const x = d3
			.scaleBand()
			.domain(data.map((d) => d.label))
			.range([0, width])
			.padding(0.4);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) * 1.1])
			.range([height, 0]);

		svg
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", (d) => x(d.label))
			.attr("y", (d) => y(d.value))
			.attr("width", x.bandwidth())
			.attr("height", (d) => height - y(d.value))
			.attr("fill", (d) => (d.label === "Expense" ? "#f87171" : "#34d399"));

		svg
			.append("g")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(x));

		svg.append("g").call(d3.axisLeft(y));
	};

	const openModal = (transaction = null) => {
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	return (
		<div className="max-w-4xl mx-auto mt-10 p-4">
			<h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
				Budget Overview - {selectedMonth}
			</h2>

			<div className="flex justify-around mb-6">
				<button
					className="btn bg-indigo-100 text-indigo-600"
					onClick={() => openModal()}
				>
					{summary ? "Update Budget" : "Set Budget"}
				</button>
				<input
					type="month"
					value={selectedMonth}
					onChange={(e) => setSelectedMonth(e.target.value)}
					className="input input-bordered w-52 !outline-0"
				/>
			</div>

			{summary ? (
				<div className="flex justify-center gap-4 mb-8">
					<div className="card bg-green-100 text-green-800 p-4 rounded-xl shadow-md">
						<h3 className="font-semibold">Monthly Budget</h3>
						<p className="text-xl font-bold">₹{summary?.budgetAmount || 0}</p>
					</div>
					<div className="card bg-red-100 text-red-800 p-4 rounded-xl shadow-md">
						<h3 className="font-semibold">Actual Expense</h3>
						<p className="text-xl font-bold">₹{summary?.actualExpense || 0}</p>
					</div>
					<div
						className={`card p-4 rounded-xl shadow-md ${
							summary?.budgetAmount >= summary?.actualExpense
								? "bg-blue-100 text-blue-800"
								: "bg-yellow-100 text-yellow-800"
						}`}
					>
						<h3 className="font-semibold">Balance</h3>
						<p className="text-xl font-bold">
							₹{(summary?.budgetAmount || 0) - (summary?.actualExpense || 0)}
						</p>
					</div>
				</div>
			) : (
				<p className="flex justify-center items-center text-red-500">
					No Budget data found for this month
				</p>
			)}

			{summary && <div ref={chartRef} className="flex justify-center" />}

			{isModalVisible && (
				<BudgetDialog
					closeModal={closeModal}
					isUpdate={summary}
					summary={summary}
					setRefreshBudget={setRefreshBudget}
				/>
			)}
		</div>
	);
};

export default BudgetManagement;
