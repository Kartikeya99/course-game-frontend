import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

class PR extends Component {
	render() {
        var t=this.props.purl+'/l'+this.props.le;
        if(this.props.path===t || this.props.user.category==='prof'){
            return(
                <Route exact path={this.props.path} component={this.props.component}/>
            )
        }
        else{
            return(<Redirect to={this.props.purl}/>);
        }
	}
}

export default PR;
