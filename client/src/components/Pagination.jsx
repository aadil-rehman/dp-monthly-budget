import React from "react";

const Pagination = ({ currentPage, totalTransactions, onPageChange }) => {
	const totalPages = Math.ceil(totalTransactions / 5);
	console.log(totalPages, currentPage);
	return (
		<div className="flex justify-center mt-6">
			<div className="join">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
					<button
						key={pageNum}
						className={`join-item btn ${
							currentPage === pageNum ? "btn-active" : ""
						}`}
						onClick={() => onPageChange(pageNum)}
					>
						{pageNum}
					</button>
				))}
			</div>
		</div>
	);
};

export default Pagination;
