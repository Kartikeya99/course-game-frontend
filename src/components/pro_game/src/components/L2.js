import React,{Component} from 'react';
import {Link} from  'react-router-dom';
import './L2.css';
class L2 extends Component {
    constructor(){
        super()
        this.state={
            ro: false,
            ans: '2',
            ammo:true,
            le: '2',
            nt: null,
            msg: null,
            cl: true,
            dl:1
        }
        this.onClick=this.onClick.bind(this);
        this.roll=this.roll.bind(this);
        this.im1=this.im1.bind(this);
        this.im2=this.im2.bind(this);
        this.im3=this.im3.bind(this);
        this.chl=this.chl.bind(this);
    }
	componentDidMount(){
        var image1 = document.getElementById("l2bw");
        var rect1 = image1.getBoundingClientRect();
        var cx = rect1.left + rect1.width * 0.5;    // find center of first image
        var cy = rect1.top + rect1.height * 0.5;
        var ball = document.getElementById("l2ball");
        var rect2 = ball.getBoundingClientRect();
        ball.style.display = '';
        ball.style.position = 'absolute';
        ball.style.left = cx -rect2.width+ 'px';
        ball.style.top = cy -rect2.height+ 'px';
        var code="//Hit the buzzer<br/>//with number same as the output of the program<br/>//Left one is number 1 <br/><br/>#include&ltiostream&gt<br/>using namespace std;<br/>int main()<br/>{<br/>&emsp; int a=0;<br/>&emsp; a++;<br/>&emsp; int t=++a;<br/>&emsp; cout&lt&lta;<br/>}";
        var cd=document.getElementById("l2code");
        cd.innerHTML=code;
        window.addEventListener('mousemove',e=>this.roll(e));
        document.getElementById("l2tar1").addEventListener('click',e=>this.im1(e));
        document.getElementById("l2tar2").addEventListener('click',e=>this.im2(e));
        document.getElementById("l2tar3").addEventListener('click',e=>this.im3(e));
        if(localStorage.getItem('l2')==='0'){
            localStorage.setItem('l2','1');
            window.location.reload(false);
        }
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
    roll(e){
        if(this.state.le==='2'){
            var x=e.clientX;
            var y=e.clientY;
            var image1 = document.getElementById("l2bw");
            if(image1===null)
                return;
            var rect1 = image1.getBoundingClientRect();
            var cx = rect1.left + rect1.width * 0.5;
            var cy = rect1.top + rect1.height * 0.5;
            if(y<cy-1)
            {
                var th=Math.atan(Math.abs(cx-x)/Math.abs(cy-y));
                th=th*180;
                th=th/Math.PI;
                var deg=th;
                if(x<cx)
                    deg=360-deg;
                document.getElementById("l2bw").style = 'transform: rotate(' + deg + 'deg)';
                //document.getElementById("ball").style = 'transform: rotate(' + deg + 'deg)';
            }
        }
    }
    im1(e){
        if(this.state.ammo){
            this.setState({ammo: false});
            var tx=e.clientX;
            var ty=e.clientY;
            var ball = document.getElementById("l2ball");
            var rect2 = ball.getBoundingClientRect();
            tx=tx-rect2.left-rect2.width*0.5;
            ty=ty-rect2.top-rect2.height*0.5;
            ball.style.opacity="100%";
            var translate3dvalue="translate3d("+tx+"px,"+ty+"px,0)";
            ball.style.transform=translate3dvalue;
            setTimeout(() => {  ball.style.opacity="0%"; }, 500);
            setTimeout(() => {   
                if(this.state.ans==="1"){
                    document.getElementById("l2code").innerHTML="<h1>Congratulations Correct Answer</h1>";
                }
                else{
                    document.getElementById("l2code").innerHTML="<h1>Wrong Answer</h1>";
                }
            }, 500);
        }
    }
    im2(e){
        if(this.state.ammo){
            this.setState({ammo: false});
            var tx=e.clientX;
            var ty=e.clientY;
            var ball = document.getElementById("l2ball");
            var rect2 = ball.getBoundingClientRect();
            tx=tx-rect2.left-rect2.width*0.5;
            ty=ty-rect2.top-rect2.height*0.5;
            ball.style.opacity="100%";
            var translate3dvalue="translate3d("+tx+"px,"+ty+"px,0)";
            ball.style.transform=translate3dvalue;
            setTimeout(() => {  ball.style.opacity="0%"; }, 500);
            setTimeout(() => {   
                if(this.state.ans==="2"){
                    document.getElementById("l2code").innerHTML="<h1>Congratulations Correct Answer</h1>";
                }
                else{
                    document.getElementById("l2code").innerHTML="<h1>Wrong Answer</h1>";
                }
            }, 500);
        }
    }
    im3(e){
        if(this.state.ammo){
            this.setState({ammo: false});
            var tx=e.clientX;
            var ty=e.clientY;
            var ball = document.getElementById("l2ball");
            var rect2 = ball.getBoundingClientRect();
            tx=tx-rect2.left-rect2.width*0.5;
            ty=ty-rect2.top-rect2.height*0.5;
            ball.style.opacity="100%";
            var translate3dvalue="translate3d("+tx+"px,"+ty+"px,0)";
            ball.style.transform=translate3dvalue;
            setTimeout(() => {  ball.style.opacity="0%"; }, 500);
            setTimeout(() => {   
                if(this.state.ans==="3"){
                    document.getElementById("l2code").innerHTML="<h1>Congratulations Correct Answer</h1>";
                }
                else{
                    document.getElementById("l2code").innerHTML="<h1>Wrong Answer</h1>";
                }
            }, 500);
        }
    }
    onClick(e){
        if(this.state.cl){
            this.setState({cl: false});
            if(e===this.state.ans){
                this.setState({
                    nt: '/l3',
                    msg: 'Move to next Level'
                });
                this.setState({dl:3});
            }
            else{
                this.setState({
                    nt: '',
                    msg: 'Go to start menu'
                });
            }
            setTimeout(() => {
                this.setState({ro:true});
            }, 500);
            this.setState({le:null});
            window.removeEventListener('mousemove',this.roll(e));
            document.getElementById("l2tar1").removeEventListener('click',e=>this.im1(e));
            document.getElementById("l2tar2").removeEventListener('click',e=>this.im2(e));
            document.getElementById("l2tar3").removeEventListener('click',e=>this.im3(e));
        }
    }
    componentWillUnmount(){
		this.chl(this.state.dl);
	}
	render() {
        let r1=require('./images/tar.png');
        let r2=require('./images/ball.png');
        let r3=require('./images/cn.png');
        var url=this.props.burl;
		return(
			<div id='l2main'>
                <div id="l2tp">
                    <div id="l2but">
                        <img id="l2tar1" src={r1} onClick={() => this.onClick('1')} alt='target'/>
                        <img id="l2tar2" src={r1} onClick={() => this.onClick('2')} alt='target'/>
                        <img id="l2tar3" src={r1} onClick={() => this.onClick('3')} alt='target'/>
                    </div>
                    <div>
                        <div>
                            <Link 
                                to={url}
                                id='l2b1'
                            >
                                Save and exit
                            </Link>
                        </div>
                        <div id='l2code'>
                            hello
                        </div>
                        <div  id='l2b2d'>
                            {this.state.ro?
                                <Link 
                                    to={`${url}${this.state.nt}`}
                                    id='l2b2'
                                >
                                    {this.state.msg}
                                </Link>
                            :
                                <div/>
                            }
                        </div>
                    </div>
                    
                </div>
                <div id='l2bt'>
                    <img  id="l2ball" src={r2} alt='ball'/>
                    <img id="l2bw" src={r3} alt='cannon'/>
                </div>
                
			</div>
		)
	}
}

export default L2;