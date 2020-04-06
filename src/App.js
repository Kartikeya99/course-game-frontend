import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CourseList from "./components/CourseList";

class App extends Component {
	constructor(props) {
		super(props);

		this.handleUser = this.handleUser.bind(this);
		this.state = { user: JSON.parse(localStorage.getItem("user")) };
	}

	handleUser(user) {
		this.setState({ user });
		this.forceUpdate();
	}

	render() {
		if (!this.state.user) {
			return <Login handleUser={this.handleUser} />;
		} else {
			return (
				<Router>
					<Navbar handleUser={this.handleUser} />
					<Switch>
						<Route path="/">
							<CourseList
								handleUser={this.handleUser}
								user={this.state.user}
							/>
						</Route>
					</Switch>
				</Router>
			);
		}
	}
}

export default App;
