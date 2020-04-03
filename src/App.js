import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
// import Login from "./Login";
import Navbar from "./components/Navbar";
import CourseList from "./components/CourseList";

class App extends Component {
	constructor(props) {
		super(props);

		this.handleLogin = this.handleLogin.bind(this);

		this.state = {
			user: {
				category: "prof",
				yearIfStud: null,
				enrolledIn: [""],
				_id: "5e86d42def23701d6c428e36",
				name: "prof",
				email: "prof",
				password: "prof",
				attemptedChallenges: [
					{
						_id: "5e86d42def23701d6c428e37"
					}
				],
				__v: 0
			}
		};
	}

	handleLogin(user) {
		this.setState(user);
	}

	render() {
		if (!this.state.user) {
			return /*<Login handleLogin={this.handleLogin} />*/ <p>Hi</p>;
		} else {
			return (
				<Router>
					<Navbar />
					<Switch>
						<Route path="/">
							<CourseList user={this.state.user} />
						</Route>
					</Switch>
				</Router>
			);
		}
	}
}

export default App;
