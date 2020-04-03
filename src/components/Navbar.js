import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<NavLink className="navbar-brand" to="/">
				Course Game
			</NavLink>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav nav mr-auto">
					<li className="nav-item">
						<NavLink className="nav-link" to="/">
							Courses
						</NavLink>
					</li>
				</ul>
				<ul className="navbar-nav nav">
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							href="#"
							id="navbarDropdownMenuLink"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							Profile
						</a>
						<div
							className="dropdown-menu"
							aria-labelledby="navbarDropdownMenuLink"
						>
							<button type="button" className="btn dropdown-item">
								Logout
							</button>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
