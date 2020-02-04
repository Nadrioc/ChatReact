export const deDuplicateMessages = (messages) => {
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

export const sortMessagesTemp = (messages, order) => {
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

export const deleteMessage = (uniqueKey) => {
	const messageList = this.state.messages.filter((x) => x.uniqueKey !== uniqueKey)
	return messageList
}
