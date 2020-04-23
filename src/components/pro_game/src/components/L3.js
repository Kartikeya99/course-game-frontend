import React,{Component} from 'react';
import {Link} from  'react-router-dom';
import './L3.css';
class L3 extends Component {
    constructor(){
        super()
        this.state={
            bl: [1,2,3,4,5,6,7,8],
            fill: [],
            rm: false,
            wb:false,
            val: [23,5,4,124,5325,346,325,3446],
            blr: 10,
            ro:false,
            nt:null,
            msg:null,
            ama:5,
            ami:3,
            dl:1
        }
        this.wb=this.wb.bind(this);
        this.bck=this.bck.bind(this);
        this.rm=this.rm.bind(this);
        this.chl=this.chl.bind(this);
    }
    componentWillUnmount(){
		this.chl(this.state.dl);
	}
    componentDidMount(){
        var e=document.getElementById('l3wbb');
        var ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+'px';
        e.style.transition='transform 1s  ease-in-out';
        e=document.getElementById('l3wbr');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+'px';
        e.style.transition='transform 1s  ease-in-out';
        e=document.getElementById('l3wbc');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+'px';
        e.style.transition='transform 1s  ease-in-out';
        e=document.getElementById('l3wbh');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+'px';
        e.style.transition='transform 1s  ease-in-out';
        e=document.getElementById('l3wbpl');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5-100+'px';
        e.style.transition='transform 1s  ease-in-out';
        e=document.getElementById('l3wbpr');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+100+'px';
        e.style.transition='transform 1s  ease-in-out';
        e=document.getElementById('l3wbl1');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5-100-25+'px';
        e.style.transform='rotate(27deg)';
        e=document.getElementById('l3wbl2');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5-100+25+'px';
        e.style.transform='rotate(-27deg)';
        e=document.getElementById('l3wbr1');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+100-25+'px';
        e.style.transform='rotate(27deg)';
        e=document.getElementById('l3wbr2');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+100+25+'px';
        e.style.transform='rotate(-27deg)';
        e=document.getElementById('l3wbbt1');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+'px';
        e=document.getElementById('l3wbbt2');
        ec=e.getBoundingClientRect();
        e.style.display='';
        e.style.position='absolute';
        e.style.left=ec.left-ec.width*0.5+'px';
        for(var i=1;i<=this.state.bl.length;++i){
            e=document.getElementById('l3b'+i.toString());
            if(i!==1){
                e.style.marginLeft='20px';
            }
            e.style.marginTop='30px';
            e.style.border= '1px solid rgb(100, 0, 0)';
            e.style.backgroundColor= 'rgb(100, 0, 0)';
            e.style.borderRadius= '50%';
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
    async wb(){
        if(this.state.ro){
            return;
        }
        if(this.state.blr===0){
            return;
        }
        if(this.state.fill.length!==2){
            return;
        }
        if(this.state.rm){
            return;
        }
        var f=1;
        var t1=this.state.fill[0];
        var t2=this.state.fill[1];
        if(this.state.val[t1.id-1]>this.state.val[t2.id-1]){
            f=-1;
        }
        var e=this.state.blr;
        e=e-1;
        this.setState({wb:true,blr:e});
        var r=document.getElementById('l3wbpl');
        var translate3dvalue="translate3d("+0+"px,"+(f*(-50))+"px,0)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3b'+t1.id);
        translate3dvalue="translate3d("+t1.x+"px,"+(t1.y+(f*(-50)))+"px,0)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbpr');
        translate3dvalue="translate3d("+0+"px,"+(f*50)+"px,0)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3b'+t2.id);
        translate3dvalue="translate3d("+t2.x+"px,"+(t2.y+(f*50))+"px,0)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbl1');
        r.style.transition='transform 1s  ease-in-out';
        translate3dvalue="translate3d("+0+"px,"+(f*(-50))+"px,0) rotate(27deg)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbl2');
        r.style.transition='transform 1s  ease-in-out';
        translate3dvalue="translate3d("+0+"px,"+(f*-50)+"px,0) rotate(-27deg)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbr1');
        r.style.transition='transform 1s  ease-in-out';
        translate3dvalue="translate3d("+0+"px,"+(f*50)+"px,0) rotate(27deg)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbr2');
        r.style.transition='transform 1s  ease-in-out';
        translate3dvalue="translate3d("+0+"px,"+(f*50)+"px,0) rotate(-27deg)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbh');
        var y=Math.atan(0.5);
        y=y*180;
        y=y/Math.PI;
        translate3dvalue='rotate('+(f*y)+'deg)';
        r.style.transform=translate3dvalue;
        await new Promise(r => setTimeout(r, 2000));
        r=document.getElementById('l3wbpl');
        translate3dvalue="translate3d("+0+"px,"+0+"px,0)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3b'+t1.id);
        translate3dvalue="translate3d("+t1.x+"px,"+t1.y+"px,0)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbpr');
        translate3dvalue="translate3d("+0+"px,"+0+"px,0)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3b'+t2.id);
        translate3dvalue="translate3d("+t2.x+"px,"+t2.y+"px,0)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbl1');
        translate3dvalue="translate3d("+0+"px,"+0+"px,0) rotate(27deg)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbl2');
        translate3dvalue="translate3d("+0+"px,"+0+"px,0) rotate(-27deg)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbr1');
        translate3dvalue="translate3d("+0+"px,"+0+"px,0) rotate(27deg)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbr2');
        translate3dvalue="translate3d("+0+"px,"+0+"px,0) rotate(-27deg)";
        r.style.transform=translate3dvalue;
        r=document.getElementById('l3wbh');
        translate3dvalue='rotate('+0+'deg)';
        r.style.transform=translate3dvalue;
        await new Promise(r => setTimeout(r, 1000));
        if(this.state.blr===0){
            r=document.getElementById('l3ms');
            r.innerHTML='After removing the balls First select the maximum ball';
        }
        this.setState({wb:false});
    }
    bck(id){
        if(this.state.ro){
            return;
        }
        id=id.key+1;
        if(this.state.rm){
            return;
        }
        if(this.state.blr===0){
            if(this.state.ama===-1){
                if(id===this.state.ami){
                    var r=document.getElementById('l3ms');
                    r.innerHTML='Correct answer Challenge Passed';
                    this.setState({
                        ro: true,
                        nt: '/l4',
                        msg: 'Move to next Level',
                    });
                    this.setState({dl:4});
                }
                else
                {
                    r=document.getElementById('l3ms');
                    r.innerHTML='Wrong answer Challenge Failed';
                    this.setState({
                        ro: true,
                        nt: '',
                        msg: 'Go to start menu'
                    });
                }
            }
            else
            {
                if(id===this.state.ama){
                    r=document.getElementById('l3ms');
                    r.innerHTML='Now select the minimum weight ball';
                    this.setState({ama: -1});
                }
                else{
                    r=document.getElementById('l3ms');
                    r.innerHTML='Wrong answer Challenge Failed';
                    this.setState({
                        ro: true,
                        nt: '',
                        msg: 'Go to start menu'
                    });
                }
            }
            return;
        }
        if(this.state.fill.length===2){
            return;
        }
        if(this.state.fill.length===1){
            if(this.state.fill[0].id===id){
                return;
            }
            var q=this.state.fill;
            var e=document.getElementById('l3wbpr');
            var ec=e.getBoundingClientRect();
            e=document.getElementById('l3b'+id);
            var ec1=e.getBoundingClientRect();
            var x=ec.left-ec1.left+(ec.width-ec1.width)*0.5;
            var y=ec.bottom-ec1.bottom;
            q.push({id:id,x:x,y:y});
            this.setState({fill:q});
            e.style.transition='transform 1s  ease-in-out';
            var d="translate3d("+x+"px,"+y+"px,0)";
            e.style.transform=d;
        }
        else if(this.state.fill.length===0){
            q=this.state.fill;
            e=document.getElementById('l3wbpl');
            ec=e.getBoundingClientRect();
            e=document.getElementById('l3b'+id);
            ec1=e.getBoundingClientRect();
            x=ec.left-ec1.left+(ec.width-ec1.width)*0.5;
            y=ec.bottom-ec1.bottom;
            q.push({id:id,x:x,y:y});
            this.setState({fill:q});
            e.style.transition='transform 1s  ease-in-out';
            d="translate3d("+x+"px,"+y+"px,0)";
            e.style.transform=d;
        }
    }
    async rm(){
        if(this.state.ro){
            return;
        }
        if(this.state.wb){
            return;
        }
        this.setState({rm:true});
        if(this.state.fill.length===0){
            return;
        }
        var t=this.state.fill;
        for(var i=0;i<t.length;++i){
            var e=document.getElementById('l3b'+t[i].id);
            var d="translate3d("+0+"px,"+0+"px,0)";
            e.style.transform=d;
        }        
        await new Promise(r => setTimeout(r, 1000));
        var y=[];
        this.setState({fill:y,rm:false});
    }
	render() {
        var url=this.props.burl;
		console.log(this.props);
		return(
			<div id='l3main'>
                <div id='l3bot'>
                    {this.state.bl.map((ball,key)=>
                        <img id={'l3b'+ball} key={key} onClick={e=>this.bck({key})}src={require('./images/l3-bl.png')} alt='ball'/>
                    )}
                </div>
                <div id='l3top'>
                    <div id='l3wbb'></div>
                    <div id='l3wbr'></div>
                    <div id='l3wbh'></div>
                    <div id='l3wbc'></div> 
                    <div id='l3wbpl'></div>
                    <div id='l3wbpr'></div>
                    <div id='l3wbl1'></div>
                    <div id='l3wbl2'></div>
                    <div id='l3wbr1'></div>
                    <div id='l3wbr2'></div>
                    <button id='l3wbbt1' onClick={this.wb}>Balance</button>
                    <button id='l3wbbt2' onClick={this.rm}>Remove</button>
                    <div id='l3wbco'>
                        <h2 id='l3ms'>Balance Remaining: {this.state.blr}</h2>
                        {this.state.ro?
                            <Link 
                                to={`${url}${this.state.nt}`}
                                id='l3bt2'
                            >
                                {this.state.msg}
                            </Link>
                        :
                            <div/>
                        }
                    </div>
                    <div id='l3inf'>
                        <h3>
                            There are 8 balls here. Each of them is of different weight.
                            You have to find the lightest and the heaviest ball. But you can't
                            figure that out by simply lifting them. So you have to use the traditional
                            weight balance to figure that out. For using the machine select 2 balls
                            First (one after another). And then  click on balance to balance them.
                            (Think before hitting the button as you have limited usage of the machine).
                            You can also remove the ball by clicking on the remove button. So you have
                            to find the lightest and heaviest ball by using the machine just 10 times. 
                        </h3>
                    </div>
                    <Link 
                        to={url}
                        id='l3bt1'
                    >
                        Save and exit
                    </Link>
                </div>
            </div>
		)
	}
}

export default L3;