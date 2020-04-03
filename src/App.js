import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
// import Login from "./Login";
import Navbar from "./components/Navbar";
import CourseList from "./components/CourseList";

// const prof = {
// 				category: "prof",
// 				yearIfStud: null,
// 				enrolledIn: [""],
// 				_id: "5e86d42def23701d6c428e36",
// 				name: "prof",
// 				email: "prof",
// 				password: "prof",
// 				attemptedChallenges: [
// 					{
// 						_id: "5e86d42def23701d6c428e37"
// 					}
// 				],
// 				__v: 0
// 			}

class App extends Component {
	constructor(props) {
		super(props);

		this.handleUser = this.handleUser.bind(this);

		this.state = {
			user: {
				category: "student",
				yearIfStud: null,
				enrolledIn: ["5e86d8c5ed7f0f25e76e7919"],
				_id: "5e8744848ba7633da6e9f782",
				name: "stud",
				email: "stud",
				password: "stud",
				attemptedChallenges: [
					{
						_id: "5e8744848ba7633da6e9f783"
					}
				],
				__v: 0
			}
		};
	}

	handleUser(user) {
		this.setState(user);
	}

	render() {
		if (!this.state.user) {
			return /*<Login handleUser={this.handleUser} />*/ <p>Hi</p>;
		} else {
			return (
				<Router>
					<Navbar />
					<Switch>
						<Route path="/">
							<CourseList
								user={this.state.user}
								handleUser={this.handleUser}
							/>
						</Route>
					</Switch>
				</Router>
			);
		}
	}
}

export default App;
