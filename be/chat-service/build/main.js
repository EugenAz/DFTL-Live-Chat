"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('joinMeeting', (meetingId) => {
        socket.join(meetingId);
        console.log(`User joined meeting: ${meetingId}`);
    });
    socket.on('message', (data) => {
        io.to(data.meetingId).emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
server.listen(PORT, () => {
    console.log(`chat-service listening on port http://localhost:${PORT}`);
});
