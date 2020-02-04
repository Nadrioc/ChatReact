import React, {Component} from 'react';
import {Messages} from '../Messages/Messages'
import {Sorter} from '../Sorter/Sorter'
import {messages} from '../../data/data.json'
// import * as h from '../../utils/MessagesHelper'

const deDuplicateMessages = (messages) => {
	let hashOfUniques = {}
	for (var i = 0; i < messages.length; i++) {
		const uuid = messages[i].uuid 
		const content = messages[i].content 
		const uniqueKey = uuid + "-" + content
		messages[i].uniqueKey = uniqueKey
		hashOfUniques[uniqueKey] = messages[i]
	}	
 	const uniqueMessages = Object.values(hashOfUniques)
 	return uniqueMessages
}

const sortMessagesTemp = (messages, order) => {
	let sortedMessages
	if(order === 'newest'){
		console.log("Newest Selected")
  		sortedMessages = messages.sort((a, b) => {
  		return new Date(a.sentAt) - new Date(b.sentAt)
		});
	} else if(order === 'oldest'){
		console.log("Oldest Selected")
  		sortedMessages = messages.sort((a, b) => {
  		return new Date(b.sentAt) - new Date(a.sentAt) 
		});
	}
	return sortedMessages
}



const getMessagesToDisplay = (messages, order) => {
	const uniqueMessages = deDuplicateMessages(messages);
	const sortedMessages = sortMessagesTemp(uniqueMessages, order)
	return sortedMessages
}

export class Body extends Component {

	state = {
		messages: getMessagesToDisplay(messages, 'newest'),
		nextIndextoGrabFrom: 5
	}

  onSortSelected = (order) => {
  	const newlySortedMessages = sortMessagesTemp(this.state.messages, order)
  	this.setState({messages: newlySortedMessages, nextIndextoGrabFrom: 5 })
  }

  deleteMessage = (uniqueKey) => {
  	const messageList = this.state.messages.filter((x) => x.uniqueKey !== uniqueKey)
  	this.setState({messages: messageList})
  }
  
  addMoreMessagesToList = () => {
  	let startingIndex = this.state.nextIndextoGrabFrom
  	this.setState({nextIndextoGrabFrom: startingIndex + 5})
  }


  onDeleteButtonClicked = (uniqueKey) => {
  	this.deleteMessage(uniqueKey)
  }

	render(){
    
		let reversedMessages = [...this.state.messages]
		reversedMessages.reverse()
		let currentMessages = reversedMessages.slice(0, this.state.nextIndextoGrabFrom).reverse()

		return (
			<>
				<Sorter changeOrder={this.onSortSelected}/>
				<Messages scrolledToEnd={this.addMoreMessagesToList} messages={currentMessages} deleting={this.onDeleteButtonClicked}/>
			</>
		)
	}
}