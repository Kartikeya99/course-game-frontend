import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import PR from './components/PR';
import Info from './components/Info';
import L1 from './components/L1';
import L2 from './components/L2';
import L3 from './components/L3';
import L4 from './components/L4';
import L5 from './components/L5';
import Navbar from '../../Navbar';
//import PR from './components/PR';

class App extends Component {
	constructor(props){
		super(props);
		if(props.user.category!=='prof'){
			var ac=props.user.attemptedChallenges;
			var f=-1;
			for(var i=0;i<ac.length;++i){
				if(ac[i].courseId===props.cid && ac[i].challengeId===props.chid){
					f=ac[i].marksScored;
				}
			}
			if(f===-1){
				var updatedUser=props.user;
				updatedUser.attemptedChallenges.push({
					courseId:props.cid,
					challengeId:props.chid,
					marksScored:1
				});
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
						this.props.handleUser(updatedUser);
					});
				f=1;
			}
			this.state={
				le:f
			}
		}
		else{
			this.state={
				le:1
			}
		}
	}
	render() {
		console.log(this.state.le);
		var {url}=this.props.match;
		const Le1=(props)=>{
			return 	<L1 
						{...props}
						cid={this.props.cid}
						chid={this.props.chid}
						burl={url}
						user={this.props.user}
						handleUser={this.props.handleUser}
					/>
		}
		const Le2=(props)=>{
			return 	<L2 
						{...props}
						cid={this.props.cid}
						chid={this.props.chid}
						burl={url}
						user={this.props.user}
						handleUser={this.props.handleUser}
					/>
		}
		const Le3=(props)=>{
			return 	<L3 
						{...props}
						cid={this.props.cid}
						chid={this.props.chid}
						burl={url}
						user={this.props.user}
						handleUser={this.props.handleUser}
					/>
		}
		const Le4=(props)=>{
			return 	<L4
						{...props}
						cid={this.props.cid}
						chid={this.props.chid}
						burl={url}
						user={this.props.user}
						handleUser={this.props.handleUser}
					/>
		}
		const Le5=(props)=>{
			return 	<L5 
						{...props}
						cid={this.props.cid}
						chid={this.props.chid}
						burl={url}
						user={this.props.user}
						handleUser={this.props.handleUser}
					/>
		}
		return(
			<div>
				<Switch>
						<PR path={`${url}/l1`} purl={url} le={this.state.le} user={this.props.user} component={Le1}/>
						<PR path={`${url}/l2`} purl={url} le={this.state.le} user={this.props.user} component={Le2}/>
						<PR path={`${url}/l3`} purl={url} le={this.state.le} user={this.props.user} component={Le3}/>
						<PR path={`${url}/l4`} purl={url} le={this.state.le} user={this.props.user} component={Le4}/>
						<PR path={`${url}/l5`} purl={url} le={this.state.le} user={this.props.user} component={Le5}/>
						<Route>
							<Navbar handleUser={this.props.handleUser} />
							<Info 
								{...this.props}
								le={this.state.le}
								user={this.props.user}
								handleUser={this.props.handleUser}
							/>
						</Route>
				</Switch>
				
			</div>
		);
	}
}

export default App;
