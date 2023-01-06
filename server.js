const express = require('express');
const WebSocket = require('ws');
const routes = require('./src/routes');

const port = 80;
const wsPort = 8080;

const app = express();
const wss = new WebSocket.Server({port : wsPort});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/', routes);
app.use(express.static('public'));

const sockets = [];

wss.on("connection", (ws) => {
    sockets.push(ws);

    ws.on("message", (msg) => {
        for (prop in sockets) {
            const socket = sockets[prop];
            if(socket != ws)
                socket.send(msg.toString());
        }
    });
});

app.listen(port, () => console.log("Server Iniciado"));