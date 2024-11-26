const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");

ws.onopen = (event) => {
  ws.onmessage = (event) => {
    console.log(event.data);
  };
};
