import React, {Fragment, Component} from 'react';
import './Message.css'


const convertHourAndMeridiem = (hour, minutes) => {
	if(hour > 12){
		hour = hour - 12
		return `${hour}:${minutes} PM`
	} 
	return `${hour}:${minutes} AM`
}

const convertMinutes = (minutes) => {
	if(minutes < 10){
		minutes = "0" + minutes
	}
	return minutes
}

const convertStringToDateTime = (sentAt) => {
	const messageDate = new Date(sentAt)
	const hour = messageDate.getHours()
	let minutes = messageDate.getMinutes()
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	let formattedDay = messageDate.toLocaleDateString("en-US", options)

	minutes = convertMinutes(minutes)
	const messageTime = convertHourAndMeridiem(hour, minutes) ;

	return {date: messageDate, time: messageTime, hour: hour, minutes: minutes, formattedDay: formattedDay}
}

export class Message extends Component {

	state = {
		messageDate: convertStringToDateTime(this.props.message.sentAt),
		hovering: false
	}

	hidden = {}

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
			this.hidden = {
				'display': 'none'
			} 
		} else {
			this.hidden = {
				'display': 'block'
			} 
		}

		let messageLayout = () => {
		if(this.props.dayChange === 'true'){
			return (
			 	<Fragment>
					<div className="date-container">{this.state.messageDate.formattedDay}</div>
		    	<div className="message-container-center">
		    		<div className="flex space-between center-align-items">
		    			<h1>{this.props.message.uuid}</h1>
		      		<p>{this.state.messageDate.time}</p>
		    		</div>
		      	<p>{this.props.message.content}</p>
		    	</div>
		    </Fragment>
		   )
		}
		return (

	    	<div className="message-container-center">
	    		<div className="flex space-between center-align-items">
	    			<h1>{this.props.message.uuid}</h1>
	      		<p>{this.state.messageDate.time}</p>
	    		</div>
	      	<p>{this.props.message.content}</p>
	    	</div>
	   )
	}

	 return (
  	<Fragment>
  		<div id={this.props.id} className="message-container" onMouseOver={() => this.toggleHover('show')} onMouseLeave={() => this.toggleHover('hide')}>
	    	{messageLayout()}
	    	<div className="delete-button-container">
	    		<div onClick={() => this.props.deleting(this.props.uniqueKey)} className="delete-button" style={this.hidden}>X</div>
	    	</div>
	    </div>
    </Fragment>
  );
	
	}

}
