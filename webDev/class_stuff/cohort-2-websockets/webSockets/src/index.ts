import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();
const httpServer = app.listen(8080);

const socketServer = new WebSocketServer({ server: httpServer });

socketServer.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    socketServer.clients.forEach((client) => {
      if(client.readyState == WebSocket.OPEN){
        client.send(data);
      }
    });
  });

  ws.send("Conneted to WebSocket");
})



