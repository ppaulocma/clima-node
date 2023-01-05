var ws = new WebSocket("ws://localhost:8080")

function sendMessage(msg) {
    ws.send(msg)
}

ws.onopen = () => {
    console.log("Conectado");
}

ws.onmessage = (msg) => {
    console.log(JSON.parse(msg.data));
}

