import React from "react";
import { category } from "../utils/helper";

const Filter = ({
	filterCategory,
	setFilterCategory,
	minAmount,
	setMinAmount,
	maxAmount,
	setMaxAmount,
	fromFilterDate,
	setFromFilterDate,
	toFilterDate,
	setToFilterDate,
}) => {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<label className="flex flex-col text-sm text-gray-500 mb-5">
				To Date
				<input
					type="date"
					className="input input-bordered w-32"
					value={fromFilterDate}
					onChange={(e) => setFromFilterDate(e.target.value)}
				/>
			</label>
			<label className="flex flex-col text-sm text-gray-500 mb-5">
				From Date
				<input
					type="date"
					className="input input-bordered w-32"
					value={toFilterDate}
					onChange={(e) => setToFilterDate(e.target.value)}
				/>
			</label>

			<select
				className="select select-bordered w-32"
				value={filterCategory}
				onChange={(e) => setFilterCategory(e.target.value)}
			>
				<option value="">All Categories</option>
				{category.map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>

			<input
				type="number"
				className="input input-bordered w-28 no-spinner"
				placeholder="Min Amt"
				value={minAmount}
				onChange={(e) => setMinAmount(e.target.value)}
			/>

			<input
				type="number"
				className="input input-bordered w-28 no-spinner"
				placeholder="Max Amt"
				value={maxAmount}
				onChange={(e) => setMaxAmount(e.target.value)}
			/>
		</div>
	);
};

export default Filter;
