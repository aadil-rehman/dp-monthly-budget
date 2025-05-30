import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/dashboard");
	}, [navigate]);

	return null; // or a loading spinner if you prefer
};

export default Home;
