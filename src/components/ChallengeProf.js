import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Question from "./QuestionClass";

const QuestionCard = (props) => {
	return (
		<div className="col-sm-12" style={{ marginBottom: "2em" }}>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.question.question}</h5>
					<p className="card-text">Answer: {props.question.answer}</p>
					<p className="card-text">
						Option: 1{props.question.option1}
					</p>
					<p className="card-text">
						Option: 2{props.question.option2}
					</p>
					<p className="card-text">
						Option: 3{props.question.option3}
					</p>
					<p className="card-text">
						Option: 4{props.question.option4}
					</p>
				</div>
			</div>
		</div>
	);
};

class ChallengeProf extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			question: "",
			option1: "",
			option2: "",
			option3: "",
			option4: "",
			answer: "",
			// this below will host question objects from the question class
			questionList: [],
			challenge: undefined,
			done: false,
			// date when to publish this challenge
			date: "",
			updated: false,
		};
	}

	componentDidMount() {
		const challengeId = this.props.match.params.challengeId;
		const urlForChallenge = `http://localhost:1916/challenge?challengeId=${challengeId}`;

		fetch(urlForChallenge)
			.then((result) => result.json())
			.then((result) => {
				this.setState({
					challenge: result.message[0],
				});
			})
			.then((urlForQuestions) => {
				fetch(
					`http://localhost:1916/question?challengeId=${challengeId}`
				)
					.then((result) => result.json())
					.then((result) => {
						let updated;
						result.message.length !== 0
							? (updated = true)
							: (updated = false);

						this.setState({
							questionList: result.message,
							done: true,
							updated,
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

		let url = "";
		this.state.updated
			? (url = "http://localhost:1916/question/update")
			: (url = "http://localhost:1916/question/create");
		const questionsObject = {
			questionList: this.state.questionList,
		};

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(questionsObject),
		})
			.then((result) => result.json())
			.then((result) => {
				let status = result.status;
				if (status === "200 OK")
					alert("Questions successfully added to challenge.");
			});
	}

	handleSubmitForm(event) {
		event.preventDefault();

		let currentQuestions = this.state.questionList;

		let question = new Question(
			this.state.challenge._id,
			"MCQ",
			this.state.question,
			this.state.answer,
			this.state.option1,
			this.state.option2,
			this.state.option3,
			this.state.option4
		);

		currentQuestions.push(question);
		this.setState({
			questionList: currentQuestions,
			question: "",
			option1: "",
			option2: "",
			option3: "",
			option4: "",
			answer: "",
		});

		this.questionCreate();
	}

	questionCreate() {
		const form = document.getElementById("questionCreateForm");
		const button = document.getElementById("questionCreateButton");

		if (form.style["display"] === "none") {
			form.style["display"] = "block";
			button.textContent = "Close Form";
		} else {
			form.style["display"] = "none";
			button.textContent = "Create New Question";
		}
	}

	render() {
		const form = (
			<div id="form">
				<br />
				<button
					type="button"
					className="btn btn-success"
					id="questionCreateButton"
					onClick={this.questionCreate}
				>
					Create New Question
				</button>
				<form
					onSubmit={this.handleSubmitForm}
					id="questionCreateForm"
					style={{ display: "none" }}
				>
					<div className="form-group">
						<label htmlFor="name" className="col-form-label">
							Question:
						</label>
						<input
							type="text"
							className="form-control"
							id="question"
							name="question"
							value={this.state.question}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="option1" className="col-form-label">
							Option1:
						</label>
						<input
							type="text"
							className="form-control"
							id="option1"
							name="option1"
							value={this.state.option1}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="option2" className="col-form-label">
							Option2:
						</label>
						<input
							type="text"
							className="form-control"
							id="option2"
							name="option2"
							value={this.state.option2}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="option3" className="col-form-label">
							Option3:
						</label>
						<input
							type="text"
							className="form-control"
							id="option3"
							name="option3"
							value={this.state.option3}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="option4" className="col-form-label">
							Option4:
						</label>
						<input
							type="text"
							className="form-control"
							id="option4"
							name="option4"
							value={this.state.option4}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="answer" className="col-form-label">
							Answer:
						</label>
						<input
							type="text"
							className="form-control"
							id="answer"
							name="answer"
							value={this.state.answer}
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
		if (this.state.done) {
			if (this.state.questionList.length) {
				let result = this.state.questionList.map((question, index) => {
					return <QuestionCard question={question} key={index} />;
				});
				return (
					<div className="container">
						<div className="row">
							<br />
							<h3>{this.state.challenge.name}</h3>
						</div>
						<div className="row">
							<br />
							{form}
							<br />
						</div>
						<div className="row">
							<br />
							{result}
							<br />
						</div>
						<div className="row">
							<br />
							<button
								type="button"
								className="btn btn-success"
								id="submitButton"
								onClick={this.handleSubmit}
							>
								Submit Questions.
							</button>
							<br />
						</div>
					</div>
				);
			} else {
				return (
					<div className="container">
						<div className="row">
							<br />
							<h3>{this.state.challenge.name}</h3>
						</div>
						<div className="row">
							<br />
							{form}
							<br />
						</div>
					</div>
				);
			}
		} else {
			return <h5>Loading...</h5>;
		}
	}
}

export default withRouter(ChallengeProf);
