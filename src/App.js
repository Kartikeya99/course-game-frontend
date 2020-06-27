import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import CourseList from "./components/CourseList";

class App extends Component {
	constructor(props) {
		super(props);

		this.handleUser = this.handleUser.bind(this);
		this.state = { user: JSON.parse(localStorage.getItem("user")) };
	}

	handleUser(user) {
		this.setState({ user });
		localStorage.setItem("user",JSON.stringify(user));
		this.forceUpdate();
		window.location.reload(false);
	}

	render() {
		if (this.state.user===null || this.state.user==="null") {
			return <Login handleUser={this.handleUser} />;
		} else {
			return (
				<Router>
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
