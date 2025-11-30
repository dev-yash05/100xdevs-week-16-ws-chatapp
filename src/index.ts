import type { WebSocket } from "ws";
import { WebSocketServer } from "ws";

const wss: WebSocketServer = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount++;
    console.log(`New user connected. Total users: ${userCount}`);

    socket.on("message", (message) => {
        console.log(`Received message: ${message.toString() }`); 
        setTimeout(()=>{
            socket.send("message recieved: " + message.toString());
            for (let i = 0; i < allSockets.length; i++){
                const s: any = allSockets[i];
                s.send("broadcast: " + message.toString());
            } 
        },1000);
    });

    socket.on("close", () =>{
        userCount--;
        console.log(`User disconnected. Total users: ${userCount}`);
    })
});