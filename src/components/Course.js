import React, { Component } from "react";
import {
	Link,
	Switch,
	Route,
	withRouter,
	useRouteMatch,
} from "react-router-dom";
import './Co.css'
import ChallengeProf from "./ChallengeProf";
import Navbar from "./Navbar";

// Used to render the card for challenges
const ChallengeCard = (props) => {
	let { url } = useRouteMatch();
	//let c=props.lB;
	let c=props.lB;
	if(c===undefined){
		c=[];
	}
	return (
		<div className="col-sm-4" style={{ marginBottom: "2em" }}>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.challenge.name}</h5>
					<Link
						to={`${url}/challenge/${props.challenge._id}-${props.challenge.name}`}
						className="btn btn-primary"
					>
						Go to Challenge
					</Link>
					<button type="button" style={{ margin: "10px" }} className="btn btn-primary" data-toggle="modal" data-target="#myModal">See Leadeaboard</button>
					<div id="myModal" className="modal fade" role="dialog">
						<div className="modal-dialog">
							<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Leadeaboard of {props.challenge.name}</h4>
								<button type="button" className="close" data-dismiss="modal">&times;</button>
							</div>
							<div className="modal-body">
							<table id='students'>
               					<tbody>
									<tr>
										<th>Rank</th>
										<th>Name</th>
										<th>Score</th>
									</tr>
								    {c.map((c, index) => {
										const { userName,marksObtained} = c //destructuring
										return (
											<tr key={index}>
											<td>{index+1}</td>
											<td>{userName}</td>
											<td>{marksObtained}</td>
											</tr>
										)
									})}
               					</tbody>
            				</table>
							
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							</div>
							</div>
						</div>
					</div>
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
			lB:[]
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
						for(var i=0;i<this.state.challenges.length;i++){
							var e=this.state.challenges[i];
							fetch(`http://localhost:1916/challenge/getLeaderBoard?challengeId=${e._id}`, {
								method: "GET",
							})
								.then((result) => result.json())
								.then((result) => {
									let v=this.state.lB;
									v.push(result.message);
									this.setState({lB:v});
									console.log(result.message)
									// Updating the state with the current user and courses.
								});
						}
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
					return <ChallengeCard key={index} lB={this.state.lB[index]} challenge={challenge} />;
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
