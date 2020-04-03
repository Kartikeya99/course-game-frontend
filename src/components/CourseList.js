import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Course from "./Course";

const CourseCard = props => {
	return (
		<div className="col-sm-4">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.course.name}</h5>
					<p className="card-text">{props.course.description}</p>
					<Link
						to={`/course/${props.course._id}`}
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
			user: props.user,
			courses: [],
			done: false,
			name: "",
			code: "",
			description: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const url = `http://localhost:1916/course?profId=${this.state.user._id}`;
		fetch(url)
			.then(result => result.json())
			.then(result => {
				this.setState({
					courses: result.message,
					done: true
				});
			});
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		console.log("submit triggered");
		let currentCourses = this.state.courses;
		const url = "http://localhost:1916/course/create";
		const course = {
			profId: this.state.user._id,
			description: this.state.description,
			code: this.state.code,
			name: this.state.name
		};
		console.log(course);
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(course)
		})
			.then(result => result.json())
			.then(result => {
				console.log(result);
				let newCourse = result.message;
				currentCourses.push(newCourse);
				this.setState({ courses: currentCourses });
			});

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
			button.textContent = "Create New Course";
		}
	}

	render() {
		if (!this.state.done) {
			return <h5>Loading...</h5>;
		} else {
			if (this.state.courses.length) {
				const result = this.state.courses.map((course, index) => {
					return <CourseCard key={index} course={course} />;
				});
				return (
					<div className="container">
						<Switch>
							<Route
								path="/course/:courseId"
								component={Course}
							/>
							<Route exact path="/">
								<div>
									<div id="form">
										<br />
										<br />
										<button
											type="button"
											className="btn btn-success"
											id="courseCreateButton"
											onClick={this.courseCreate}
										>
											Create New Course
										</button>
										<form
											onSubmit={this.handleSubmit}
											id="courseCreateForm"
											style={{ display: "none" }}
										>
											<div className="form-group">
												<label
													htmlFor="name"
													className="col-form-label"
												>
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
												<label
													htmlFor="description"
													className="col-form-label"
												>
													Course Description:
												</label>
												<input
													type="text"
													className="form-control"
													id="description"
													name="description"
													value={
														this.state.description
													}
													onChange={this.handleChange}
												/>
											</div>
											<div className="form-group">
												<label
													htmlFor="code"
													className="col-form-label"
												>
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
											<button
												type="submit"
												className="btn btn-primary"
											>
												Create
											</button>
										</form>
										<br />
										<br />
									</div>
									<div className="row">{result}</div>
								</div>
							</Route>
						</Switch>
					</div>
				);
			} else {
				return <h5>No courses to show. Create some new courses.</h5>;
			}
		}
	}
}

export default CourseList;
