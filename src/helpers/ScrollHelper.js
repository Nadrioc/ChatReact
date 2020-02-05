export const scrollElementToBottom = (listElement) => {
	listElement.scroll(0, 100000000);
}

export const findNewTopElementID = (topMessage) => {
	return "id" + topMessage.uniqueKey;
}

export const adjustScrollPositionToPreviousTopMessage = (prevTopElementId) => {
	const prevTopElement = document.querySelector(`#${prevTopElementId}`);
	if(prevTopElement){
		prevTopElement.scrollIntoView(true);
	}
}