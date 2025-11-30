import type { WebSocket } from "ws";
import { WebSocketServer } from "ws";

const wss: WebSocketServer = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    roomId: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
    console.log("New User Connected");

    socket.on("message", (message) => {
        console.log(`Received message: ${message.toString() }`);
        const msg = JSON.parse(message.toString());
        if (msg.type === "join") {
            const user: User = {
                socket: socket,
                roomId: msg.payload.roomId
            };
            allSockets.push(user);
        }
        if (msg.type === "chat"){
            let currentUserRoomId = allSockets.find(user => user.socket === socket)?.roomId;
            allSockets.forEach(user => {
                if (user.roomId === currentUserRoomId){
                    user.socket.send(JSON.stringify(msg.payload.message));
                }
            })
        }
        

    });

    socket.on("close", () =>{
        console.log("User Disconnected");
        
    })
});