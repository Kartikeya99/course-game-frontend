import React, { Component } from "react";
import {
	Link,
	Switch,
	Route,
	withRouter,
	useRouteMatch,
} from "react-router-dom";
import Course from "./Course";
import Navbar from "./Navbar";

const CourseCard = (props) => {
	let { url } = useRouteMatch();
	return (
		<div className="col-sm-4" style={{ marginBottom: "2em" }}>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.course.name}</h5>
					<p className="card-text">{props.course.description}</p>
					<Link
						to={`${url}/courses/${props.course._id}`}
						className="btn btn-primary"
					>
						Go to Course
					</Link>
				</div>
			</div>
		</div>
	);
};

class CourseList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.user,
			courses: [],
			done: false,
			name: "",
			code: "",
			description: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// We get courses by profId as courses have profId attr
		if (this.state.user.category === "prof") {
			const url = `http://localhost:1916/course?profId=${this.state.user._id}`;
			fetch(url)
				.then((result) => result.json())
				.then((result) => {
					this.setState({
						courses: result.message,
						done: true,
					});
				});
		}
		// Every student has an enrolledIn array attr and we get courses from that
		if (this.state.user.category === "student") {
			const url = "http://localhost:1916/course";
			let courses = { courseList: this.state.user.enrolledIn };
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(courses),
			})
				.then((result) => result.json())
				.then((result) => {
					let courses = result.message;
					this.setState({ courses, done: true });
				});
		}
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

		let currentCourses = this.state.courses;
		// For prof its just making a new course
		if (this.state.user.category === "prof") {
			const url = "http://localhost:1916/course/create";
			const course = {
				profId: this.state.user._id,
				description: this.state.description,
				code: this.state.code,
				name: this.state.name,
			};
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(course),
			})
				.then((result) => result.json())
				.then((result) => {
					let newCourse = result.message;
					currentCourses.push(newCourse);
					this.setState({ courses: currentCourses });
				});
		}
		// adding a course for a student occurs in two steps
		if (this.state.user.category === "student") {
			let course = {
				name: this.state.name,
				code: this.state.code,
			};
			const validateUrl = "http://localhost:1916/course/validate";
			let finalUser;
			// We first validate if the details entered are correct or not
			fetch(validateUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(course),
			})
				.then((result) => result.json())
				.then((result) => {
					if (!result.message.length) {
						alert("Please try again! Course NOT found");
					} else {
						// If they are, we then add that course to the enrolledIn of that student and then to the state.
						course = result.message[0];
						currentCourses.push(course);
						let updatedUser = this.state.user;
						updatedUser.enrolledIn.push(course._id);
						finalUser = updatedUser;
						const updateUrl = "http://localhost:1916/user/update";
						// Updating the enrolledIn
						fetch(updateUrl, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(updatedUser),
						})
							.then((result) => result.json())
							.then((result) => {
								// Updating the state with the current user and courses.
								this.setState({
									courses: currentCourses,
								});
								this.props.handleUser(finalUser);
							});
					}
				});
		}

		this.courseCreate();
	}

	courseCreate() {
		const form = document.getElementById("courseCreateForm");
		const button = document.getElementById("courseCreateButton");
		if (form.style["display"] === "none") {
			form.style["display"] = "block";
			button.textContent = "Close Form";
		} else {
			form.style["display"] = "none";
			button.textContent = "Add new course";
		}
	}

	render() {
		const profForm = (
			<div id="form">
				<br />
				<br />
				<button
					type="button"
					className="btn btn-success"
					id="courseCreateButton"
					onClick={this.courseCreate}
				>
					Add new course
				</button>
				<form
					onSubmit={this.handleSubmit}
					id="courseCreateForm"
					style={{ display: "none" }}
				>
					<div className="form-group">
						<label htmlFor="name" className="col-form-label">
							Course Name:
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
					<div className="form-group">
						<label htmlFor="description" className="col-form-label">
							Course Description:
						</label>
						<input
							type="text"
							className="form-control"
							id="description"
							name="description"
							value={this.state.description}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="code" className="col-form-label">
							Course Code:
						</label>
						<input
							type="text"
							className="form-control"
							id="code"
							name="code"
							value={this.state.code}
							onChange={this.handleChange}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Go
					</button>
				</form>
				<br />
				<br />
			</div>
		);

		const studForm = (
			<div id="form">
				<br />
				<br />
				<button
					type="button"
					className="btn btn-success"
					id="courseCreateButton"
					onClick={this.courseCreate}
				>
					Add new course
				</button>
				<form
					onSubmit={this.handleSubmit}
					id="courseCreateForm"
					style={{ display: "none" }}
				>
					<div className="form-group">
						<label htmlFor="name" className="col-form-label">
							Course Name:
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
					<div className="form-group">
						<label htmlFor="code" className="col-form-label">
							Course Code:
						</label>
						<input
							type="text"
							className="form-control"
							id="code"
							name="code"
							value={this.state.code}
							onChange={this.handleChange}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Go
					</button>
				</form>
				<br />
				<br />
			</div>
		);
		if (!this.state.done) {
			return (
				<div className="spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			);
		} else {
			if (this.state.courses.length) {
				let { url } = this.props.match;
				const result = this.state.courses.map((course, index) => {
					return <CourseCard key={index} course={course} />;
				});
				return (
					<div>
						<Switch>
							<Route
								path={`${url}/courses/:courseId`}
								render={(props) => (
									<Course
										{...props}
										user={this.state.user}
										handleUser={this.props.handleUser}
									/>
								)}
							/>
							<Route path="/">
								<div>
									<Navbar handleUser={this.props.handleUser} />
									<div className="container">
										{this.state.user.category === "prof"
											? profForm
											: studForm}
										<div className="row">{result}</div>
									</div>
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
							<div className="row">
								<h5>
									{this.state.user.category === "prof"
										? profForm
										: studForm}
									No challenges to show.
								</h5>
							</div>
						</div>
					</div>
				);
			}
		}
	}
}

export default withRouter(CourseList);
