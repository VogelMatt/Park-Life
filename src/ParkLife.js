import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import "./ParkLife.css"
import { ParkSearch } from "./components/search/ParkSearch"


export const ParkLife = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			
				<>
					<NavBar />
					
					
					<ApplicationViews/>
					
				</>
			

		} />
	</Routes>
}