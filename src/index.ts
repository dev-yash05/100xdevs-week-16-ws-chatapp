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
        allSockets.forEach( s => {
            s.send(`Some User : ${message.toString() }`);
        })
    });

    socket.on("close", () =>{
        userCount--;
        allSockets = allSockets.filter( s => s !== socket);
        console.log(`User disconnected. Total users: ${userCount}`);
    })
});