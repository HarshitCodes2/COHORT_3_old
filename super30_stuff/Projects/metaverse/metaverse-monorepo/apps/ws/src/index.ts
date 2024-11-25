import { WebSocket, WebSocketServer } from "ws";

if(process.env.WS_PORT){
  const wss = new WebSocketServer({ port: parseInt(process.env.WS_PORT) })

  wss.on('connection', (ws) => {

    
    ws.on('error', console.error);

    ws.send('something')
  })

  
}else{
  console.log("WS_PORT not fount in process.env");
}


