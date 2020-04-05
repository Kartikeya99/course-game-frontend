import React, { Component } from "react";
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useStoreState } from "easy-peasy";

import Login from "./components/Login";
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

// user: {
// 				category: "student",
// 				yearIfStud: null,
// 				enrolledIn: ["5e86d8c5ed7f0f25e76e7919"],
// 				_id: "5e8744848ba7633da6e9f782",
// 				name: "stud",
// 				email: "stud",
// 				password: "stud",
// 				attemptedChallenges: [
// 					{
// 						_id: "5e8744848ba7633da6e9f783",
// 					},
// 				],
// 				__v: 0,
// 			}

let user = useStoreState((state) => state.userModel.user);

const PrivateRoute = ({ children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				user !== null ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

class App extends Component {
	constructor(props) {
		super(props);

		this.handleUser = this.handleUser.bind(this);

		this.state = useStoreState((state) => state.userModel.user);
	}

	render() {
		return (
			<Router>
				<Navbar />
				<Switch>
					<PrivateRoute path="/courses">
						<CourseList />
					</PrivateRoute>
					<Route path="/login">
						<Login />
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
