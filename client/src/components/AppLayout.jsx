import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const AppLayout = () => {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			if (user) return;

			try {
				const res = await axios.get(BASE_URL + "/profile", {
					withCredentials: true,
				});
				dispatch(addUser(res?.data?.data));
			} catch (err) {
				if (
					err?.status === 401 ||
					err?.response?.status === 401 ||
					err?.response?.data?.error === "Please login"
				) {
					navigate("/login");
				}
				console.error(err);
			}
		};

		fetchUser();
	}, []);

	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

export default AppLayout;
