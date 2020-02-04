import React, {Component} from 'react';
import {Message} from '../Message/Message'
import './Messages.css'

export class Messages extends Component{

	lastMessage = this.props.messages[0]
	lastDate = new Date(this.lastMessage.sentAt)

	state ={
		lastTopElementId: null,
		scrollElement: null
	}

	isOnSameDay = (currentDate) => {
		if(this.lastDate.getDate() === currentDate.getDate() 
			&& this.lastDate.getMonth() === currentDate.getMonth() 
			&& this.lastDate.getFullYear() === currentDate.getFullYear()){
			return false
		} else {
			return true
		}
	}

	componentDidMount = () => {
		const listElement = document.querySelector("#message-list")
		let topElement = this.props.messages[0]
 		let newLastTopElementId = 'a' + topElement.uuid + topElement.content
		this.setState({scrollElement: listElement, lastTopElementId: newLastTopElementId})
		listElement.scroll(0, 100000000)
		listElement.addEventListener("scroll", () => {
			if(listElement.scrollTop === 0){
				this.props.scrolledToEnd()
			}
		})
	}

	componentDidUpdate = (prevProps) => {
		if(prevProps !== this.props){
			const myElement = document.querySelector(`#${this.state.lastTopElementId}`)
			if(prevProps.messages.length < this.props.messages.length){
				console.log("SCROLLING")
				if(myElement){
					myElement.scrollIntoView(true)
					let topElement = this.props.messages[0]
		 			let newLastTopElementId = 'a' + topElement.uuid + topElement.content
		 			if(this.state.lastTopElementId !== newLastTopElementId){
		 				console.log("UPDATING STATE")
						this.setState({lastTopElementId: newLastTopElementId})
		 			}
				}
			} else {
				console.log("SOMETHING GOT DELETED")
				let topElement = this.props.messages[0]
	 			let newLastTopElementId = 'a' + topElement.uuid + topElement.content
	 			if(this.state.lastTopElementId !== newLastTopElementId){
	 				this.setState({lastTopElementId: newLastTopElementId})
	 			}
			}
			console.log("previous", prevProps.messages.length)
			console.log("current", this.props.messages.length)
		}
		
	}

 	render(){
 		
 		let messageList = this.props.messages.map((message, index) => {
	 		const currentDate = new Date(message.sentAt)
	 		let dayChangeStatus = "false"
	 		if(this.isOnSameDay(currentDate) || index === 0){
	 			dayChangeStatus = "true"
	 		} 
	 		this.lastDate = new Date(message.sentAt)
	 		return <Message key={message.uniqueKey} id={'a' + message.uuid + message.content} deleting={this.props.deleting} uniqueKey={message.uniqueKey} message={message} dayChange={dayChangeStatus}/>
 		})
	


		return (
	    <div>
	      <h1>Your Messages:</h1>
	      <div id="message-list" className="messages-container">{messageList}</div>
	    </div>
	  );
 	}

  
}

