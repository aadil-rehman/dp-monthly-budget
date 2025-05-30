import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Loader from "./Loader";

const Dashboard = () => {
	const [summary, setSummary] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState(() => {
		const now = new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
			2,
			"0"
		)}`;
	});
	const chartRef = useRef();

	const fetchSummary = async (month) => {
		setIsLoading(true);
		try {
			const res = await axios.get(
				`${BASE_URL}/transaction/summary?month=${month}`,
				{ withCredentials: true }
			);
			setSummary(res.data.summary);
		} catch (err) {
			console.error("Failed to fetch summary", err);
			setSummary(null);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchSummary(selectedMonth);
	}, [selectedMonth]);

	useEffect(() => {
		if (summary) drawChart(summary);
	}, [summary]);

	const drawChart = (summary) => {
		const data = [
			{ label: "Income", value: summary.totalIncome },
			{ label: "Expense", value: summary.totalExpense },
			{ label: "Balance", value: summary.balance },
		];

		const width = 500;
		const height = 200;
		const margin = { top: 20, right: 40, bottom: 40, left: 100 };

		d3.select(chartRef.current).selectAll("*").remove(); // Clear old chart

		const svg = d3
			.select(chartRef.current)
			.attr("width", width)
			.attr("height", height);

		const xScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value)])
			.range([margin.left, width - margin.right]);

		const yScale = d3
			.scaleBand()
			.domain(data.map((d) => d.label))
			.range([margin.top, height - margin.bottom])
			.padding(0.2);

		// Bars
		svg
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", margin.left)
			.attr("y", (d) => yScale(d.label))
			.attr("width", (d) => xScale(d.value) - margin.left)
			.attr("height", yScale.bandwidth())
			.attr("fill", (d) =>
				d.label === "Income"
					? "#4ade80"
					: d.label === "Expense"
					? "#f87171"
					: "#60a5fa"
			);

		// Labels
		svg
			.selectAll("text.label")
			.data(data)
			.enter()
			.append("text")
			.attr("class", "label")
			.attr("x", (d) => xScale(d.value) + 5)
			.attr("y", (d) => yScale(d.label) + yScale.bandwidth() / 2 + 4)
			.text((d) => `$${d.value}`)
			.attr("fill", "#333");

		// Y Axis
		svg
			.append("g")
			.attr("transform", `translate(${margin.left}, 0)`)
			.call(d3.axisLeft(yScale).tickSize(0))
			.selectAll("text")
			.attr("font-size", "12px");
	};

	return (
		<div className="max-w-4xl mx-auto mt-10 p-4">
			<h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
				Finance Summary – {selectedMonth}
			</h2>

			<div className="flex justify-center mb-6">
				<input
					type="month"
					value={selectedMonth}
					onChange={(e) => setSelectedMonth(e.target.value)}
					className="input input-bordered w-52 !outline-0"
				/>
			</div>
			<div className="flex justify-center items-center">
				{isLoading ? (
					<p className="text-center text-gray-500">Loading summary...</p>
				) : (
					summary && (
						<div>
							<svg ref={chartRef}></svg>
						</div>
					)
				)}
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-40">
					<Loader />
				</div>
			) : summary ? (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="card bg-green-100 shadow-md p-4">
						<h3 className="text-lg font-semibold text-green-700 mb-2">
							Income
						</h3>
						<p className="text-2xl font-bold text-green-800">
							₹ {summary.totalIncome.toLocaleString()}
						</p>
					</div>

					<div className="card bg-red-100 shadow-md p-4">
						<h3 className="text-lg font-semibold text-red-700 mb-2">Expense</h3>
						<p className="text-2xl font-bold text-red-800">
							₹ {summary.totalExpense.toLocaleString()}
						</p>
					</div>

					<div className="card bg-blue-100 shadow-md p-4">
						<h3 className="text-lg font-semibold text-blue-700 mb-2">
							Balance
						</h3>
						<p className="text-2xl font-bold text-blue-800">
							₹ {summary.balance.toLocaleString()}
						</p>
					</div>
				</div>
			) : (
				<p className="text-center text-red-500">
					No data found for this month.
				</p>
			)}
		</div>
	);
};

export default Dashboard;
