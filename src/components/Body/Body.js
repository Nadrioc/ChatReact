import React, {Component} from 'react';
import {Messages} from '../Messages/Messages';
import {Sorter} from '../Sorter/Sorter';
import {messages as messagesJson} from '../../data/data.json';
import * as messageHelper from '../../helpers/MessagesHelper';

export class Body extends Component {

	state = {
		messages: messageHelper.sortAndDeduplicateMessages(messagesJson, 'newest'),
		nextIndextoGrabFrom: 5,
    order: 'newest'
	}

  onSortSelected = (order) => {
  	const newlySortedMessages = messageHelper.sortMessages(this.state.messages, order);
  	this.setState({messages: newlySortedMessages, nextIndextoGrabFrom: 5, order: order});
  }

  deleteMessage = (uniqueKey) => {
  	const messageList = messageHelper.deleteMessage(this.state.messages, uniqueKey);
  	this.setState({messages: messageList});
  }
  
  addMoreMessagesToList = () => {
  	let startingIndex = this.state.nextIndextoGrabFrom;
  	this.setState({nextIndextoGrabFrom: startingIndex + 5});
  }

  onDeleteButtonClicked = (uniqueKey) => {
  	this.deleteMessage(uniqueKey);
  }

	render(){
	  
    const currentMessages = messageHelper.appendAndReverseMessageList(this.state.messages, this.state.nextIndextoGrabFrom);
		
    return (
			<>
				<Sorter changeOrder={this.onSortSelected} order={this.state.order}/>
				<Messages 
          onScrolledToEnd={this.addMoreMessagesToList} 
          order={this.state.order} 
          messages={currentMessages} 
          deleting={this.onDeleteButtonClicked}/>
			</>
		)
	}
}