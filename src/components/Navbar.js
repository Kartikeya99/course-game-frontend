import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.changeUser = this.changeUser.bind(this);
	}

	changeUser() {
		localStorage.clear();
		this.props.handleUser(null);
	}

	render() {
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
				<div
					className="collapse navbar-collapse"
					id="navbarNavDropdown"
				>
					<ul className="navbar-nav nav mr-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to="/courses">
								Courses
							</NavLink>
						</li>
					</ul>
					<ul className="navbar-nav nav">
						<li className="nav-item dropdown">
							{/* eslint-disable-next-line*/}
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
								<button
									type="button"
									className="btn dropdown-item"
									onClick={this.changeUser}
								>
									Logout
								</button>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
