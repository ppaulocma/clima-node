const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const wss = new WebSocket.Server({port : 8080});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

const port = 80;

const sockets = [];

app.get("/", async (req, res) => {
    res.render('index');
});

wss.on("connection", (ws) => {
    sockets.push(ws);

    ws.on("message", (msg) => {
        console.log(msg.toString());

        for (w in sockets) {
            if(sockets[w] != ws)
            sockets[w].send(msg.toString())
        }
    });
});

app.listen(port, () => console.log("Server Iniciado"));