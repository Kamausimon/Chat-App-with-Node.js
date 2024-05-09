const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'

const serverUrl = `${protocol}://${window.location.host}`
const socket = new WebSocket(serverUrl)

socket.onopen = function (event) {
	console.log('Connected to the websocket server')
}

socket.onclose = function (event) {
	if (event.wasClean) {
		console.log(
			`The connection was closed cleanly. data=${event.code} reason=${event.reason}`
		)
	} else {
		console.log('The connection died')
	}
}

const messageInput = document.getElementById('chat-input')

document.getElementById('send-btn').addEventListener('click', function () {
	const message = messageInput.value.trim()

	if (message) {
		socket.send(message)
		messageInput.value = ''
	}
})

//receive message
socket.onmessage = function (event) {
	const chatBox = document.getElementById('chat-box')
	console.log(chatBox)
	const newMessage = document.createElement('div')
	newMessage.textContent = event.data
	chatBox.appendChild(newMessage)
	console.log(`Data received from server: ${event.data}`)
}

let sendButton = document.getElementById('send-btn')

messageInput.addEventListener('keyup', function (event) {
	if (event.key === 'Enter') {
		event.preventDefault()
		sendButton.click()
	}
})

socket.onerror = function (error) {
	console.log('WebSocket Error:', error)
}
