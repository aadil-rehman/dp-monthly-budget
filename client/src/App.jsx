import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import TransactionManagement from "./components/TransactionManagment";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import Dashboard from "./components/dashboard";
import BudgetManagement from "./components/BudgetManagement";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/transaction" element={<TransactionManagement />} />
						<Route path="/budget" element={<BudgetManagement />} />
					</Route>
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
