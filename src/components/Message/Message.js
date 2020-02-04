import React, {Fragment, Component} from 'react';
import './Message.css';
import * as dateHelper from '../../utils/DateHelper';
import cross from '../../assets/images/Delete.svg';

export class Message extends Component {

	state = {
		messageDate: dateHelper.convertSentAtToDateTimeObject(this.props.message.sentAt),
		hovering: false
	}

	hoverStyle = {}

	toggleHover = (status) => {
		let newHoverStatus = this.state.hovering
		if(status === 'show'){
			newHoverStatus = true
			this.setState({hovering: newHoverStatus})
		}if(status === 'hide') {
			newHoverStatus = false
			this.setState({hovering: newHoverStatus})
		}
	}	
	
	render(){

		if(!this.state.hovering){
			this.hoverStyle = {
				'display': 'none'
			} 
		} else {
			this.hoverStyle = {
				'display': 'block'
			} 
		}

		let messageLayout = () => {
		if(this.props.dayChange === 'true'){
			return (
				<div className="date-container">
					<h3>{this.state.messageDate.formattedDay}</h3>
					<hr className="dotted-line"></hr>
				</div>)			   
		}
	}

	 return (
  	<Fragment>
  		<div id={this.props.id} className="message-container" onMouseOver={() => this.toggleHover('show')} onMouseLeave={() => this.toggleHover('hide')}>
	    	{messageLayout()}
	    	<div className="message-container-center">
	    		<div className="flex center-align-items">
	    			<img alt="User Avatar" className="avatar" src={`https://api.adorable.io/avatars/262/${this.props.message.uuid}`}/>
	    			<h1>{this.props.message.uuid}</h1>
	      		<p style={{'fontWeight': '300', 'fontSize': '13px'}}>{this.state.messageDate.time}</p>
	    		</div>
	      	<p>{this.props.message.content}</p>
	      	<div onClick={() => this.props.deleting(this.props.uniqueKey)} className="delete-button" style={this.hoverStyle}>
	      		<img alt="Delete Button" src={cross} />
  				</div>
	    	</div>
	    </div>
    </Fragment>
  );
	
	}

}
