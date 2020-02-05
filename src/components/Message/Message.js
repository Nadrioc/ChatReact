import React, {Component} from 'react';
import './Message.css';
import * as dateHelper from '../../helpers/DateHelper';
import cross from '../../assets/images/Delete.svg';

export class Message extends Component {

	state = {
		dateObject: dateHelper.convertSentAtToDateTimeObject(this.props.message.sentAt),
		hovering: false
	}

	toggleHover = (status) => {
		this.setState({hovering: status});
	}	
	
	onMouseOver = () => {
		this.toggleHover(true);
	}

	onMouseLeave = () => {
		this.toggleHover(false);
	}

	render(){
		
		let hoverClass = "hidden";
		if(this.state.hovering){
			hoverClass = "";
		}

		let dateLayout;
		if(this.props.dayChange === 'true'){
			dateLayout = (
				<div className="message-date-container flex">
					<h3>{this.state.dateObject.formattedDay}</h3>
					<hr className="message-dotted-line full-width"></hr>
				</div>
			)			   
		}

 		return (
  		<div 
  			id={this.props.id} className="full-width" onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
	    	{dateLayout}
	    	<div className="message-content-container">
	    		<div className="flex center-align-items">
	    			<img 
	    				alt="User Avatar" 
	    				className="message-avatar" 
	    				src={`https://api.adorable.io/avatars/262/${this.props.message.uuid}`}/>
	    			<h1>{this.props.message.uuid}</h1>
	      		<p className="message-time">{this.state.dateObject.time}</p>
	    		</div>
	      	<p>{this.props.message.content}</p>
	      	<div onClick={() => this.props.deleting(this.props.uniqueKey)} className={`message-delete-button ${hoverClass}`}>
	      		<img alt="Delete Button" src={cross} />
  				</div>
	    	</div>
	    </div>
  	);
	}
}
