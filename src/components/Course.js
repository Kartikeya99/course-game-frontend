import React, { Component } from "react";
import {
	Link,
	Switch,
	Route,
	withRouter,
	useRouteMatch,
} from "react-router-dom";

import ChallengeProf from "./ChallengeProf";
import Navbar from "./Navbar";

// Used to render the card for challenges
const ChallengeCard = (props) => {
	let { url } = useRouteMatch();
	return (
		<div className="col-sm-4" style={{ marginBottom: "2em" }}>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.challenge.name}</h5>
					<Link
						to={`${url}/challenge/${props.challenge.name}`}
						className="btn btn-primary"
					>
						Go to Challenge
					</Link>
				</div>
			</div>
		</div>
	);
};

class Course extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			course: null,
			challenges: [],
			done: false,
			name: "",
			user: this.props.user,
		};
	}

	componentDidMount() {
		const courseId = this.props.match.params.courseId;
		const urlForCourse = `http://localhost:1916/course?courseId=${courseId}`;
		// fetching the course from its id as we dont get that as prop due to router
		fetch(urlForCourse)
			.then((result) => result.json())
			.then((result) => {
				this.setState({
					course: result.message[0],
				});
			})
			// We fetch all challenges for that courseId
			.then((urlForChallenge) => {
				fetch(`http://localhost:1916/challenge?courseId=${courseId}`)
					.then((result) => result.json())
					.then((result) => {
						this.setState({
							challenges: result.message,
							done: true,
						});
					});
			});
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		let currentChallenges = this.state.challenges;
		const url = "http://localhost:1916/challenge/create";
		const challenge = {
			courseId: this.state.course._id,
			name: this.state.name,
		};

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(challenge),
		})
			.then((result) => result.json())
			.then((result) => {
				let newChallenge = result.message;
				currentChallenges.push(newChallenge);
				this.setState({ challenges: currentChallenges });
			});

		this.challengeCreate();
	}

	challengeCreate() {
		const form = document.getElementById("challengeCreateForm");
		const button = document.getElementById("challengeCreateButton");

		if (form.style["display"] === "none") {
			form.style["display"] = "block";
			button.textContent = "Close Form";
		} else {
			form.style["display"] = "none";
			button.textContent = "Create New challenge";
		}
	}

	render() {
		// Form to create a challenge. Only visible to prof
		const form = (
			<div id="form">
				<button
					type="button"
					className="btn btn-success"
					id="challengeCreateButton"
					onClick={this.challengeCreate}
				>
					Create New Challenge
				</button>
				<form
					onSubmit={this.handleSubmit}
					id="challengeCreateForm"
					style={{ display: "none" }}
				>
					<div className="form-group">
						<label htmlFor="name" className="col-form-label">
							Challenge Name:
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Create
					</button>
				</form>
				<br />
				<br />
			</div>
		);

		if (!this.state.done) {
			return (
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">
						Loading course and challenges...
					</span>
				</div>
			);
		} else {
			if (this.state.challenges.length) {
				let { url } = this.props.match;
				var cid = url.substring(url.lastIndexOf('/')+1);
				const result = this.state.challenges.map((challenge, index) => {
					return <ChallengeCard key={index} challenge={challenge} />;
				});
				return (
					<div>
						<Switch>
							{(
								<Route
									path={`${url}/challenge/:challengeName`}
									render={(props) => (
										<ChallengeProf
											{...props}
											cid={cid}
											user={this.state.user}
											handleUser={this.props.handleUser}
										/>
									)}
								/>
							)}
							{/* {this.state.user.category === "student" && (
								<Route
									path={`${url}/challenge/:challengeId`}
									render={(props) => (
										<ChallengeStudent
											{...props}
											user={this.state.user}
											handleUser={this.props.handleUser}
										/>
									)}
								/>
							)} */}
							<Route exact path={url}>
								<Navbar handleUser={this.props.handleUser} />
								<div className="container">
									<h3>{this.state.course.name}</h3>
									<p>{this.state.course.description}</p>
									{this.state.user.category === "prof"
										? form
										: ""}
									<div className="row">{result}</div>
								</div>
							</Route>
						</Switch>
					</div>
				);
			} else {
				return (
					<div>
						<Navbar handleUser={this.props.handleUser} />
						<div className="container">
							<br />
							<h3>{this.state.course.name}</h3>
							<p>{this.state.course.description}</p>
							<div className="row">
								<h5>
									{this.state.user.category === "prof"
										? form
										: ""}
									No challenges to show. Create new challanges.
								</h5>
							</div>
						</div>
					</div>
				);
			}
		}
	}
}

export default withRouter(Course);
