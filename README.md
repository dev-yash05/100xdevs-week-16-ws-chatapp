# ⚡ Real-Time Chat Server (Node.js + WebSockets)

A lightweight, high-performance WebSocket server built from scratch using Node.js and the raw `ws` library (no Socket.io). This project demonstrates how to handle persistent full-duplex connections, room-based routing, and strict type safety.

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Library:** `ws` (Raw WebSocket Protocol)

## 🚀 Features
- **Real-Time Communication:** Instant bidirectional messaging between client and server.
- **Room Management:** Logic to handle specific rooms (users only receive messages from their joined `roomId`).
- **Type Safety:** TypeScript interfaces (`User`, custom message types) ensure payload consistency.
- **User State Management:** Tracks active sockets and associated metadata in memory.

## ⚙️ How It Works
Unlike standard HTTP requests, this server keeps connections open.
1. **Handshake:** Client connects to `ws://localhost:8080`.
2. **Join Room:** Client sends a JSON payload with `type: "join"` and a `roomId`.
3. **Broadcasting:** When a user sends a message, the server iterates through `allSockets`, filters by `roomId`, and sends the data only to relevant peers.

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js installed

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/dev-yash05/100xdevs-week-16-ws-chatapp.git](https://github.com/dev-yash05/100xdevs-week-16-ws-chatapp.git)
