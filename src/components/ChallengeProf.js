import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ChallengeProf extends Component {
	constructor(props) {
		super(props);
		this.state={
			co:null
		}
	}
	componentDidMount(){
		var url=this.props.match.url;
		var filename = url.substring(url.lastIndexOf('/')+1);
		const co=require('./'+filename+'/src/App').default;
		this.setState({co:co});
		//this.setState({co:co});
	}
	render() {
		const Co=this.state.co;
		var {url}=this.props.match;
		var chid = url.substring(url.lastIndexOf('/')+1);
		return(
			<div>
				{this.state.co?
					<Co 
						{...this.props}
						user={this.props.user}
						handleUser={this.props.handleUser}
						cid={this.props.cid}
						chid={chid}
					/>
				:
					<div></div>
				}
			</div>
		)
	}	
}

export default withRouter(ChallengeProf);

