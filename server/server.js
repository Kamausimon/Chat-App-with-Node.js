const express = require('express')
const app = express()
const http = require('http').createServer(app)
const WebSocket = require('ws')

//send static files from the public folder
app.use(express.static('../client'))

//initialize a new websocket instance
const wss = new WebSocket.Server({ server: http })

wss.on('connection', (ws) => {
	console.log('New client connected')

	ws.on('message', (message) => {
		console.log(`Received: ` + message)
		//share the message
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message)
			}
		})
	})
	ws.on('close', () => {
		console.log('client disconnected')
	})
});

const port = 1337

http.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})
