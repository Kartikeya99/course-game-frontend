import React,{Component} from 'react';
import './Info.css';
import {Link} from  'react-router-dom';
class Info extends Component {
	render() {
		var url=this.props.match.url;
		var le;
		var msg;
		if(this.props.user.category==='prof'){
			le=1;
			msg='See game';
		}
		else{
			le=this.props.le;
			if(le===1){
				msg='Start Game';
			}
			else{
				msg='Resume Game';
			}
		}
		return(
			<div id='imain'>
				<div id='itit'>
					<h1>Programming Game</h1>
				</div>
				<p>
				Description: Years ago karan use to hear stories of Treasure house
				from his family and he was so into the story. Finally after many Years
				now  somehow he got the location of the treasure house and he wants to
				reach to the treasure. The problem is the treasure is situated in a hidden
				location and there are many traps and lock in the house. The house is also
				guarded by a guy name Aman. To reach the treasure one has to pass through
				many rooms in the house and in each room one has to figure out how to proceed
				to  the next room.  If by chance hit the wrong button or something the alarm
				will raise and the husain will kick you out of the house. So please help
				Karan find the treasure.
				</p>
				<p>
				Total Level: 5
				</p>
				<p>
				Rules: If at any level you give wrong answer you will be kicked out of the house
				and you have to start from the beginning. Also in the starting of each level
				you will be given the option of save till now and exit. But just after you make a
				single move, without completing the level you can't exit. If you try to exit, you will
				be transfered to level 1. So  if you start a challenge you will either go to next level
				or the game will be over(transfered to level 1) or the game is won.
				</p>
				<p>
					Note: Play the game in full screen mode or atleast maximized mode. 
				</p>
				<Link
					to=	{`${url}/l${le}`}
					id='ibn'
				>
					{msg}
				</Link>
			</div>
		)
	}
}

export default Info;