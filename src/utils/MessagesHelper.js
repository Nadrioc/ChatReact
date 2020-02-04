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

export const sortMessages = (messages, order) => {
	let sortedMessages
	if(order === 'newest'){
  		sortedMessages = messages.sort((a, b) => {
  		return new Date(a.sentAt) - new Date(b.sentAt)
		});
	} else if(order === 'oldest'){
  		sortedMessages = messages.sort((a, b) => {
  		return new Date(b.sentAt) - new Date(a.sentAt) 
		});
	}
	return sortedMessages
}

export const deleteMessage = (messageList, uniqueKey) => {
	return  messageList.filter((x) => x.uniqueKey !== uniqueKey)
}


export const appendAndReverseMessageList = (messageList, nextStartingIndex) => {
	let reversedMessages = [...messageList]
	reversedMessages.reverse()
	return reversedMessages.slice(0, nextStartingIndex).reverse()
}

export const sortAndDeduplicateMessages = (messages, order) => {
	const uniqueMessages = deDuplicateMessages(messages);
	const sortedMessages = sortMessages(uniqueMessages, order)
	return sortedMessages
}