import React, {Component} from 'react';
import {Message} from '../Message/Message'
import * as dateHelper from '../../helpers/DateHelper'
import * as scrollHelper from '../../helpers/ScrollHelper'
import './Messages.css'

export class Messages extends Component{

	state ={
		lastTopElementId: null,
	}

	scrollEventListener = () => {
		if(this.listElement.scrollTop === 0){
			this.props.onScrolledToEnd()
		}
	}

	addInfiniteScrollEventListener = () => {
		this.removeInfiniteScrollEventListener()
		this.listElement.addEventListener("scroll", this.scrollEventListener)
	}

	removeInfiniteScrollEventListener = () => {
		this.listElement.removeEventListener("scroll", this.scrollEventListener)
	}

	setNewTopElementIdState = () => {
		const newTopElementId = scrollHelper.findNewTopElementID(this.props.messages[0])
		if(this.state.lastTopElementId !== newTopElementId){
			this.setState({lastTopElementId: newTopElementId})
		}
	}

	handleInfiniteScrolling = (prevProps) => {
		const hasInfiniteScrollingOccured = prevProps.messages.length < this.props.messages.length
		if(hasInfiniteScrollingOccured){
			scrollHelper.adjustScrollPositionToPreviousTopMessage(this.state.lastTopElementId)
			this.setNewTopElementIdState()
		} else {
			this.setNewTopElementIdState()
		}
	}

	componentDidMount = () => {
		this.listElement = document.querySelector("#message-list")
		this.setNewTopElementIdState()
		scrollHelper.scrollElementToBottom(this.listElement)
		this.addInfiniteScrollEventListener()
	}

	componentDidUpdate = (prevProps) => {
		if(prevProps.order !== this.props.order){
			scrollHelper.scrollElementToBottom(this.listElement)
		}
		if(prevProps !== this.props){
			this.handleInfiniteScrolling(prevProps)
		}
	}

	componentWillUnmount = () => {
		this.removeInfiniteScrollEventListener()
	}

 	render(){
 		
 	  let lastDate = new Date(this.props.messages[0].sentAt)

 		let messageList = this.props.messages.map((message, index) => {
	 		const currentDate = new Date(message.sentAt)
	 		const dayChangeStatus = dateHelper.doesMessageComponentNeedADayChange(currentDate, index, lastDate)
	 		lastDate = currentDate

	 		return (
	 				<Message 
	 					key={message.uniqueKey} 
	 					id={'a' + message.uniqueKey} 
	 					deleting={this.props.deleting} 
	 					uniqueKey={message.uniqueKey} 
	 					message={message} 
	 					dayChange={dayChangeStatus}/>
	 			)
 		})
	
		return (
	    <div className="main-container">
	      <h1 className="messages-header">Your Messages:</h1>
	      <div id="message-list" className="messages-container">{messageList}</div>
	    </div>
	  );
 	}

  
}

