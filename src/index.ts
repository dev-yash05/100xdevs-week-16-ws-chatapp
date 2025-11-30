import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;

wss.on("connection", (socket) => {
    userCount++;
    console.log(`New user connected. Total users: ${userCount}`);

    socket.on("message", (message) => {
        console.log(`Received message: ${message.toString() }`); 
        setTimeout(()=>{
            socket.send("message recieved: " + message.toString()); 
        },1000);
    });

    socket.on("close", () =>{
        userCount--;
        console.log(`User disconnected. Total users: ${userCount}`);
    })
});