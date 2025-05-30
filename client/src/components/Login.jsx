import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
	const [emailId, setEmailId] = useState("aadil@gmail.com");
	const [password, setPassword] = useState("Aadil@123");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	const handleLogin = async () => {
		if (!emailId || !password) return;
		setLoading(true);
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{ emailId, password },
				{ withCredentials: true }
			);

			if (res.data.status === 1) {
				dispatch(addUser(res?.data?.data));
				window.location.href = "/dashboard";
			}
		} catch (error) {
			console.error("Login error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
				<h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
					Budget Tracker Login
				</h2>

				<div className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							className="input input-bordered w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
							value={emailId}
							onChange={(e) => setEmailId(e.target.value)}
							placeholder="Enter your email"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							type="password"
							className="input input-bordered w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
						/>
					</div>

					<button
						className={`btn btn-primary w-full py-2 text-white bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.02] ${
							loading ? "loading" : ""
						}`}
						onClick={handleLogin}
						disabled={loading}
					>
						Login
					</button>

					<p className="text-sm text-center text-gray-500">
						Don't have an account?{" "}
						<span className="text-indigo-600 font-medium cursor-pointer hover:underline">
							Signup
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
