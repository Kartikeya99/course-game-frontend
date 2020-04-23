import React,{Component} from 'react';
import {Link} from  'react-router-dom';
import './L4.css';
class L4 extends Component {
    constructor(){
        super()
        this.state={
            kid: ['1','2','3','4','5','6','7',
            '8','9','10','11','12','13','14',
            '15','16','17','18','19','20','21',
            '22','23','24','25','26','27','28',
            '29','30','31','32'],
            ans: '16',
            mv: true,
            ct: 5,
            ro: false,
            nt: null,
            msg: null,
            inf: true,
            dl:1
        }
        this.onClick=this.onClick.bind(this);
        this.mov=this.mov.bind(this);
        this.info=this.info.bind(this);
        this.chl=this.chl.bind(this);
    }
    componentWillUnmount(){
		this.chl(this.state.dl);
	}
    componentDidMount(){
        localStorage.setItem('pgl5','0');
        var c=0;
        for(var i=32;i>=1;i--){
            var e=document.getElementById('l4k'+i.toString());
            e.style.height=134-c+'px';
            var w=69-((134-c)*69)/134;
            e.style.padding=c/2+'px '+w/2+'px';
            c=c+2;
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
    info(){
        this.setState({inf:false});
    }
    async mov(id){
        var k=document.getElementById('l4k'+id);
        var kc=k.getBoundingClientRect();
        var x=kc.left;
        var q=parseInt(id);
        var cu=q;
        var ans=parseInt(this.state.ans);
        q=Math.ceil(q/8);
        var dy=138*(5-q)+5;
        var translate3dvalue="translate3d("+69+"px,"+0+"px,0)";
        k.style.transform=translate3dvalue;
        await new Promise(r => setTimeout(r, 500));
        translate3dvalue="translate3d("+69+"px,"+dy+"px,0)";
        k.style.transform=translate3dvalue;
        var dl=document.getElementById('l4dli');
        var dlc=dl.getBoundingClientRect();
        var tx=dlc.left;
        tx=tx-x+dlc.width*0.5-kc.width*0.5;
        await new Promise(r => setTimeout(r, 500));
        translate3dvalue="translate3d("+tx+"px,"+dy+"px,0)";
        k.style.transform=translate3dvalue;
        await new Promise(r => setTimeout(r, 500));
        if(ans>=cu){
            k.style.transitionDuration='0s';
            k.src=require('./images/l4kyh.png');
            var e=document.getElementById('l4k'+id);
            var t=id.toString();
            t=(32-t);
            e.style.height=63-t+'px';
            var w=69-((63-t)*69)/63;
            e.style.padding=t/2+'px '+w/2+'px';
            translate3dvalue="translate3d("+tx+"px,"+(dy-93-t/2)+"px,0)";
            k.style.transform=translate3dvalue;
            var pop=document.getElementById('l4poph1');
            pop.innerHTML='Key goes inside';
            pop.style.opacity='100%';
            await new Promise(r => setTimeout(r, 1500));
            pop.style.opacity='0%';
            translate3dvalue="translate3d("+tx+"px,"+dy+"px,0)";
            k.style.transform=translate3dvalue;
            k.src=require('./images/l4ky.png');
            e=document.getElementById('l4k'+id);
            t=id.toString();
            t=(32-t)*2;
            e.style.height=134-t+'px';
            w=69-((134-t)*69)/134;
            e.style.padding=t/2+'px '+w/2+'px';
            await new Promise(r => setTimeout(r, 500));
            k.style.transitionDuration='0.5s';
        }
        else{
            k.style.transitionDuration='0s';
            t=id.toString();
            t=(32-t);
            translate3dvalue="translate3d("+tx+"px,"+(dy-23-t)+"px,0)";
            k.style.transform=translate3dvalue;
            pop=document.getElementById('l4poph1');
            pop.innerHTML='Key doesn\'t go inside';
            pop.style.opacity='100%';
            await new Promise(r => setTimeout(r, 1500));
            pop.style.opacity='0%';
            translate3dvalue="translate3d("+tx+"px,"+dy+"px,0)";
            k.style.transform=translate3dvalue;
            await new Promise(r => setTimeout(r, 500));
            k.style.transitionDuration='0.5s';
        }
        translate3dvalue="translate3d("+69+"px,"+dy+"px,0)";
        k.style.transform=translate3dvalue;
        await new Promise(r => setTimeout(r, 500));
        translate3dvalue="translate3d("+69+"px,"+0+"px,0)";
        k.style.transform=translate3dvalue;
        await new Promise(r => setTimeout(r, 500));
        translate3dvalue="translate3d("+0+"px,"+0+"px,0)";
        k.style.transform=translate3dvalue;
        await new Promise(r => setTimeout(r, 500));
        var r=this.state.ct;
        this.setState({mv:true,ct:r-1});
        if(this.state.ct===0){
            var v=document.getElementById('l4poph1');
            v.style.opacity='100%';
            v.innerHTML='Now pick the correct Key';
        }
    }
    onClick(id){
        if(this.state.inf){
            return;
        }
        if(this.state.mv){
            if(this.state.ct){
                this.setState({mv:false});
                this.mov(id);
            }
            else{
                if(id===this.state.ans){
                    var v=document.getElementById('l4poph1');
                    v.innerHTML='Hurray! Correct Key';
                    this.setState({
                        ro: true,
                        nt: '/l5',
                        msg: 'Move to next Level'
                    })
                    this.setState({dl:5});
                }
                else{
                    v=document.getElementById('l4poph1');
                    v.innerHTML='Bad luck! Wrong Key';
                    this.setState({
                        ro: true,
                        nt: '',
                        msg: 'Go to start menu'
                    })
                }
            }
        }
    }
	render() {
        var url=this.props.burl;
		console.log(this.props);
		return(
			<div id='l4main'>
                <div id='l4dl'>
                    <img id='l4dli' src={require('./images/Lock-door.jpg')} alt='door'/>
                </div>
                <Link 
                    to={url}
                    id='l4b1'
                >
                    Save and exit
                </Link>
                <button id='l4b4' onClick={e=>{this.setState({inf:true})}}>See Info</button>
                <div id='l4pop'>
                    <h1 id='l4poph1'>hello</h1>
                    {this.state.ro?
                        <Link 
                            to={`${url}${this.state.nt}`}
                            id='l4b2'
                        >
                            {this.state.msg}
                        </Link>
                    :
                        <div/>
                    }
                </div>
                <div id='l4key'>
                    {this.state.kid.map((it,key)=>
                        <img id={'l4k'+it} key={key} onClick={e=>this.onClick(it)} src={require('./images/l4ky.png')} alt='key'/>
                    )}
                </div>
                {this.state.inf?
                    <div id='l4inf'>
                        <button id='l4b3' onClick={this.info}>Close</button>
                        To complete this level, you have to open the door. For that you have 
                        to unlock the padlock with some key. Here 32 keys are available with 
                        increasing size from left to right. Also size of key in each row is 
                        smaller than the next row. The key for the lock is the key with optimal
                        size. Some keys can easily get into the lock and some cant't. If you click
                        on any of the key it will try to insert into the lock automatically. So just
                        select the key to check it. A message will be displayed about the result.                        You can insert
                        Key into the lock atmost 5 times after which the alarm will be raised.
                        <br/>
                        Good Luck!
                    </div>
                :
                    <div/>
                }
            </div>
		)
	}
}

export default L4;