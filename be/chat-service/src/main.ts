import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

type Message = {
  id: string;
  meetingId: string;
  userName: string;
  message: string;
};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinMeeting', (meetingId: string) => {
    socket.join(meetingId);
    console.log(`User joined meeting: ${meetingId}`);
  });

  socket.on('message', (data: Message) => {
    io.to(data.meetingId).emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`chat-service listening on port http://localhost:${PORT}`);
});
