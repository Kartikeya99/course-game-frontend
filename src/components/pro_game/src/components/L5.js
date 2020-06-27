import React,{Component} from 'react';
import {Link} from  'react-router-dom';
import './L5.css';
class L5 extends Component {
    constructor(){
        super()
        this.state={
            dev: [
                {
                    id: 1,
                    l: 3,
                    r: 8
                },
                {
                    id: 2,
                    l: 16,
                    r: 18
                },
                {
                    id: 3,
                    l: 12,
                    r: 12
                },
                {
                    id: 4,
                    l: 15,
                    r: 15
                },
                {
                    id: 5,
                    l: 19,
                    r: 19
                },
                {
                    id: 6,
                    l: 14,
                    r: 32
                },
                {
                    id: 7,
                    l: 17,
                    r: 18
                },
                {
                    id: 8,
                    l: 9,
                    r: 9
                },
                {
                    id: 9,
                    l: 8,
                    r: 38
                },
                {
                    id: 10,
                    l: 9,
                    r: 38
                }
            ],
            bat1: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            bat2: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            us: null,
            ans: 6,
            cp: 0,
            nt:null,
            msg:null,
            ro:false,
            mv:false,
            inf:true,
            dl:1
        }
        this.onClick=this.onClick.bind(this);
        this.mov=this.mov.bind(this);
        this.chk=this.chk.bind(this);
        this.info=this.info.bind(this);
        this.chl=this.chl.bind(this);
    }
    componentWillUnmount(){
		this.chl(this.state.dl);
	}
    componentDidMount(){
        if(localStorage.getItem('pgl5')!=='1'){
            localStorage.setItem('pgl5','1');
            window.location.reload(false);
        }
        for(var i=1;i<=this.state.dev.length;i++){
            var e=document.getElementById('l5dev'+i.toString());
            e.style.background= 'green';
            if(i===1){
                e.style.margin='100px 0px 0px 0px';    
            }
            else{
                e.style.margin='100px 0px 0px 40px';
            }
        }
        for(i=1;i<=40;++i){
            e=document.getElementById('l5bi'+i.toString());
            e.style.transition='transform 1s  ease-in-out';
        }
        var a=[];
        for(i=1;i<=40;++i){
            a.push(0);
        }
        this.setState({us:a});
        e=document.getElementById('l5vad');
        var ec1=e.getBoundingClientRect();
        for(i=1;i<=4;++i){
            e=document.getElementById('l5dev'+i.toString());
            var ec=e.getBoundingClientRect();
            e=document.getElementById('l5dp'+i.toString()+'h');
            e.style.display='';
            e.style.position='absolute';
            e.style.left=ec.left+ec.width*0.5-5+'px';
            e.style.top=ec.bottom+'px';
            e.style.height=ec1.bottom-ec.bottom-i*20+'px';
            e.style.width='10px';
            e.style.backgroundColor='red';
            e=document.getElementById('l5dp'+i.toString()+'w');
            e.style.display='';
            e.style.position='absolute';
            e.style.left=ec.left+ec.width*0.5+5+'px';
            e.style.top=ec1.bottom-i*20-10+'px';
            e.style.width=ec1.left-(ec.left+ec.width*0.5+5)+'px';
            e.style.height='10px';
            e.style.backgroundColor='red';
        }
        for(i=5;i<=6;i++){
            e=document.getElementById('l5dev'+i.toString());
            ec=e.getBoundingClientRect();
            e=document.getElementById('l5dp'+i.toString()+'h');
            e.style.display='';
            e.style.position='absolute';
            e.style.left=ec.left+ec.width*0.5-5+'px';
            e.style.top=ec.bottom+'px';
            e.style.height=ec1.top-ec.bottom+'px';
            e.style.width='10px';
            e.style.backgroundColor='red';
        }
        for(i=7;i<=10;++i){
            e=document.getElementById('l5dev'+i.toString());
            ec=e.getBoundingClientRect();
            e=document.getElementById('l5dp'+i.toString()+'h');
            e.style.display='';
            e.style.position='absolute';
            e.style.left=ec.left+ec.width*0.5-5+'px';
            e.style.top=ec.bottom+'px';
            e.style.height=ec1.bottom-ec.bottom-(11-i)*20+'px';
            e.style.width='10px';
            e.style.backgroundColor='red';
            e=document.getElementById('l5dp'+i.toString()+'w');
            e.style.display='';
            e.style.position='absolute';
            e.style.left=ec1.right+'px';
            e.style.top=ec1.bottom-(11-i)*20-10+'px';
            e.style.width=ec.left+ec.width*0.5-5-ec1.right+'px';
            e.style.height='10px';
            e.style.backgroundColor='red';
        }
        e=document.getElementById('l5b2m');
        e.innerHTML='';
    }
    chk(){
        var g=0;
        for(var i=1;i<=10;++i){
            var e=this.state.dev[i-1];
            var f=0;
            for(var j=e.l;j<=e.r;++j){
                if(this.state.us[j-1]){
                    f=1;
                    break;
                }
            }
            if(f===0){
                g=i;
                break;
            }
        }
        return g?0:1;
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
    async mov(e){
        var a=this.state.us;
        var g=document.getElementById('l5dev'+e.id);
        var gc=g.getBoundingClientRect();
        for(var i=e.l;i<=e.r;++i){
            a[i-1]=1;
            var r=document.getElementById('l5bi'+i.toString());
            var rc=r.getBoundingClientRect();
            var x=gc.left-rc.left+gc.width*0.5-rc.width*0.5;
            var y=gc.top-rc.top-rc.height;
            var translate3dvalue="translate3d("+x+"px,"+y+"px,0)";
            r.style.transform=translate3dvalue;
        }
        await new Promise(r => setTimeout(r, 1000));
        var id=e.id.toString();
        this.setState({us:a});
        r=document.getElementById('l5dp'+id+'h');
        r.style.backgroundColor='blue';
        r=document.getElementById('l5dp'+id+'w');
        r.style.backgroundColor='blue';
        y=this.state.cp;
        y=y+1;
        this.setState({cp:y});
        if(this.chk()){
            this.setState({
                nt: '',
                msg: 'Go to start menu',
                ro: true
            });
            r=document.getElementById('l5b2m');
            r.innerHTML='Challenge failed';
        }
        if(y===this.state.ans){
            e=document.getElementById('l5vai');
            e.src=require('./images/l5-ky.png');
            this.setState({
                nt: '/l6',
                msg: 'Move to next Level',
                ro: true
            });
            this.setState({dl:6});
            const userAt={
                userId :this.props.user._id,
                userName :this.props.user.name,
                marksObtained : "6"
            };
            var url=this.props.match.url;
            var temp = url.split('/');
            temp = temp[temp.length-2];
            temp = temp.split('-');
            fetch(`http://localhost:1916/challenge/addAttempt?challengeId=${temp[0]}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userAt),
            })
                .then((result) => result.json())
                .then((result) => {
                    console.log(result);
                    // Updating the state with the current user and courses.
                });
            r=document.getElementById('l5b2m');
            r.innerHTML='Challenge Passed';
        }
        this.setState({mv:false});
    }
    onClick(e){
        if(this.state.ro){
            return;
        }
        if(this.state.mv){
            return;
        }
        this.setState({mv:true});
        var f=0;
        for(var i=e.l;i<=e.r;++i){
            if(this.state.us[i-1]===1){
                f=1;
                break;
            }
        }
        if(f){
            this.setState({mv:false});
            return;
        }
        this.mov(e);
    }
    info(){
        this.setState({inf:false});
    }
	render() {
        var url=this.props.burl;
		console.log(this.props);
		return(
			<div id='l5main'>
                <Link 
                    to={url}
                    id='l5b1'
                >
                    Save and exit
                </Link>
                <button id='l5b4' onClick={e=>{this.setState({inf:true})}}>See Info</button>
                <div id='l5bat'>
                    {this.state.bat1.map((id,key)=>
                        <div className='l5d' key={key}>
                            <div>
                                <img id={'l5bi'+id}src={require('./images/l5-cb.png')} alt='battery'/>
                                <br/>
                                <h2>{id}</h2>
                            </div>
                        </div>
                    )}
                    <br/>
                    {this.state.bat2.map((id,key)=>
                        <div className='l5d' key={key}>
                            <div>
                                <img id={'l5bi'+(id+20)}src={require('./images/l5-cb.png')} alt='battery'/>
                                <br/>
                                <h2>{20+id}</h2>
                            </div>
                        </div>
                    )}
                </div>
                <div id='l5dev'>
                    {this.state.dev.map((ob,key)=>
                        <div id={'l5dev'+ob.id} key={key} onClick={e=>this.onClick(ob)}>
                            <h3>{ob.l}-{ob.r}</h3>
                        </div>
                    )}
                </div>
                <div id='l5va'>
                    <div id='l5vad'>
                        <img id='l5vai' src={require('./images/l5-va.png')} alt='vault'/>
                    </div>
                </div>
                <div>
                    <div id='l5dp1h'></div>
                    <div id='l5dp1w'></div>
                    <div id='l5dp2h'></div>
                    <div id='l5dp2w'></div>
                    <div id='l5dp3h'></div>
                    <div id='l5dp3w'></div>
                    <div id='l5dp4h'></div>
                    <div id='l5dp4w'></div>
                    <div id='l5dp5h'></div>
                    <div id='l5dp5w'></div>
                    <div id='l5dp6h'></div>
                    <div id='l5dp6w'></div>
                    <div id='l5dp7h'></div>
                    <div id='l5dp7w'></div>
                    <div id='l5dp8h'></div>
                    <div id='l5dp8w'></div>
                    <div id='l5dp9h'></div>
                    <div id='l5dp9w'></div>
                    <div id='l5dp10h'></div>
                    <div id='l5dp10w'></div>
                </div>
                <div id='l5b2'>
                    <h2 id='l5b2m'>hello</h2>
                    {this.state.ro?
                        <Link 
                            to={`${url}${this.state.nt}`}
                            id='l5b2b'
                        >
                            {this.state.msg}
                        </Link>
                    :
                        <div/>
                    }
                </div>
                {this.state.inf?
                    <div id='l5inf'>
                        <button id='l5b3' onClick={this.info}>Close</button>
                        To complete this level, you have to open the Vault. The vault is
                        connected with 10 different chips. To open the vault atleast
                        {this.state.ans} out of
                        10 chips should be On. To  turn On a chip you have to connect it with
                        batteries. Each chip is quite different from others and they also require
                        different set of batteries. Each chip has two number associated with them.
                        So for each chip with number l and r, to  turn it on you have to connect
                        it to all the batteries from l to r both inclusive. You have 40 batteries
                        each of different size from size 1 to 40. Each battery can only be inserted
                        into 1 chip. If you select a chip which you want to turn on and if
                        the batteries for its range are available, the chip will turn on and the 
                        corresponding batteries will be removed from the inventory. Select the chips
                        optimally as you have to turn on atleast {this.state.ans} chips.
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

export default L5;