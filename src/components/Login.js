import React, { Component } from "react";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.name === "check" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const url = "http://localhost:1916/user/";
		const challenge = {
			password: this.state.password,
			email: this.state.email,
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
				let user = result.message[0];

				if (user) {
					if (this.state.check) {
						localStorage.setItem("user", JSON.stringify(user));
					}
					this.props.handleUser(user);
				} else {
					alert(
						"The username or password is not correct. Please try again!"
					);
				}
			});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-4 offset-md-4">
						<h3 className="text-center">Login</h3>
						<form onSubmit={this.handleSubmit} id="form">
							<div className="form-group">
								<label
									htmlFor="email"
									className="col-form-label"
								>
									Email:
								</label>
								<input
									type="text"
									className="form-control"
									id="email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group">
								<label
									htmlFor="password"
									className="col-form-label"
								>
									Password:
								</label>
								<input
									type="password"
									className="form-control"
									id="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="check"
									value={this.state.checked}
									onChange={this.handleChange}
									name="check"
								/>
								<label
									className="form-check-label"
									htmlFor="check"
								>
									Keep Logged In
								</label>
							</div>
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
