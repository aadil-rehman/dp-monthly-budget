import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		} else {
			navigate("/login");
		}
	}, [user, navigate]);

	return null;
};

export default Home;
