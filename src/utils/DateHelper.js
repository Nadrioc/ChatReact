export const areMessagesFromDifferentDays = (lastDate, currentDate) => {
	if(lastDate.getDate() === currentDate.getDate() 
		&& lastDate.getMonth() === currentDate.getMonth() 
		&& lastDate.getFullYear() === currentDate.getFullYear()){
			return false
	} else {
		return true
	}
}

export const doesMessageComponentNeedADayChange = (currentDate, currentIndex, lastDate) => {
	let dayChangeStatus = "false"
	if(areMessagesFromDifferentDays(lastDate, currentDate) || currentIndex === 0){
 			dayChangeStatus = "true"
		} 
		return dayChangeStatus
}

export const convertHourAndMeridiem = (hour, minutes) => {
	if(hour > 12){
		hour = hour - 12
		return `${hour}:${minutes} PM`
	} 
	return `${hour}:${minutes} AM`
}

export const convertMinutes = (minutes) => {
	if(minutes < 10){
		minutes = "0" + minutes
	}
	return minutes
}

export const convertSentAtToDateTimeObject = (sentAt) => {
	const messageDate = new Date(sentAt)
	const hour = messageDate.getHours()
	let minutes = messageDate.getMinutes()
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	let formattedDay = messageDate.toLocaleDateString("en-US", options)
	minutes = convertMinutes(minutes)
	const messageTime = convertHourAndMeridiem(hour, minutes) ;

	return {date: messageDate, time: messageTime, hour: hour, minutes: minutes, formattedDay: formattedDay}
}


