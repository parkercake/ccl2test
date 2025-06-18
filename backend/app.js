require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require("path");
const messageModel = require('./models/messageModel');
const cookieParser = require('cookie-parser');

const port = 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors({
    origin: 'http://localhost:5173', // ✅ your Vite/React frontend
    credentials: true               // ✅ allow sending cookies
}));
app.use(cookieParser());

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const groupRouter = require('./routes/groups');
const eventRouter = require('./routes/events');
const userEvents = require('./routes/userEvents');

app.use('/auth', authRouter);
app.use('/', userEvents);
app.use('/events', eventRouter);
app.use('/users', usersRouter);
app.use('/groups', groupRouter);

// HTTP + Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // or your frontend domain
        methods: ["GET", "POST"]
    }
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinGroup', (groupId) => {
        socket.join(`group_${groupId}`);
    });

    socket.on('sendMessage', async (data) => {
        const { groupId, user_id, name, first_name, last_name } = data;

        await messageModel.addMessage(groupId, user_id, name);

        io.to(`group_${groupId}`).emit('newMessage', {
            groupId,
            user_id,
            name,
            first_name,
            last_name
        });
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});