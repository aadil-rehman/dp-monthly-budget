import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Header = () => {
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/logout",
				{},
				{
					withCredentials: true,
				}
			);
			if (res?.data?.status === 1) {
				console.log("Logout successfully");
				navigate("/login");
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl">Budget Tracker</a>
			</div>
			<div className="navbar-center hidden sm:flex">
				<ul className="menu menu-horizontal flex gap-12 px-1">
					<li>
						<Link to="/dashboard">Finance Dashboard</Link>
					</li>
					<li>
						<Link to="/Budget">Monthly Budget</Link>
					</li>
					<li>
						<Link to="/transaction">Transatction</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				<button className="btn btn-ghost" onClick={handleLogout}>
					<span>
						<IoLogOutOutline className="w-5 h-5" />
					</span>
					<p className="text-sm">Logout</p>
				</button>
			</div>
		</div>
	);
};

export default Header;
