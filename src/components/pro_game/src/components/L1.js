import React,{Component} from 'react';
import {Link} from  'react-router-dom';
import './L1.css';
class L1 extends Component {
	constructor(props){
		super(props)
		this.state={
			vl:true,
			im: "dr",
			ac: true,
			ro:false,
			msg:null,
			nt:null,
			l1: require('./images/door.jpg'),
			l2: require('./images/door.jpg'),
			dl:1
		}
		this.onClick=this.onClick.bind(this);
		this.chl=this.chl.bind(this);
	}
	chl(le){
		var ac=this.props.user.attemptedChallenges;
		for(var i=0;i<ac.length;++i){
			if(ac[i].courseId===this.props.cid && ac[i].challengeId===this.props.chid){
				if(ac[i].marksScored===le){
					return;
				}
				ac[i].marksScored=le;
				break;
			}
		}
		var updatedUser=this.props.user;
		updatedUser.attemptedChallenges=ac;
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
	}
	onClick(f,e){
		let ans=null;
		var c=Math.random();
		if(c>0.5){
			ans='2';
		}
		else{
			ans='1';
		}
		console.log(c);
		if(this.state.ac===false){
			return;
		}
		this.setState({ac:false});
		if(e==='1'){
			if(e===ans){
				this.setState({l1:require('./images/AC.jpg')});
			}
			else{
				this.setState({l1:require('./images/WA.jpg')});
			}
		}
		else{
			if(e===ans){
				this.setState({l2:require('./images/AC.jpg')});
			}
			else{
				this.setState({l2:require('./images/WA.jpg')});
			}
		}	
		if(e===ans){
			this.setState({
				msg:'Move to next Level',
				nt:'/l2'
			});
			this.setState({dl:2});
		}
		else{
			this.setState({
				msg:'Go to start menu',
				nt:''
			});
		}
		this.setState({ro:true});
	}
	componentWillUnmount(){
		this.chl(this.state.dl);
	}
	render() {
		var url=this.props.burl;
		return(
			<div id='l1main'>
				<div id='l1tp'>
					<div id='l1tl'>
						<Link 
							to={url}
							id='l1b1'
						>
							Save and exit
						</Link>
					</div>
					<h2>
						First level, if failed you will end up here 
						only so no hints. Lets see how well you can 
						guess. Select the actual door to enter the house.
					</h2>
				</div>
				<div id='l1tr'>
						{this.state.ro?
						<Link 
							to={`${url}${this.state.nt}`}
							id='l1b2'
						>
							{this.state.msg}
						</Link>
						:
						<div/>
						}
				</div>
				<div id='l1btm'>
					<img id='l1dl' src={this.state.l1} onClick={(e) => this.onClick(e,'1')} alt='door'/>
					<img id='l1dr' src={this.state.l2} onClick={(e) => this.onClick(e,'2')} alt='door'/>
				</div>
			</div>
		)
	}
}

export default L1;