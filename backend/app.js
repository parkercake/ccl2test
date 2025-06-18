require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const expressSession = require('express-session');
const sharedSession = require('express-socket.io-session');
const cors = require('cors');
const path = require("path");
const messageModel = require('./models/messageModel');
const cookieParser = require('cookie-parser');

const port = 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors(
    {
    origin: true,               // ✅ your Vite/React frontend
    credentials: true               // ✅ allow sending cookies
}
));
app.use(cookieParser());

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const groupRouter = require('./routes/groups');
const eventRouter = require('./routes/events');
const userEvents = require('./routes/userEvents');

app.use('/api/auth', authRouter);
app.use('/api', userEvents);
app.use('/api/events', eventRouter);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupRouter);

// HTTP + Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // or your frontend domain
        methods: ["GET", "POST"]
    }
});
const session = expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
})

// app.use(session);
// io.use(sharedSession(session))
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

app.use(
    express.static(path.join(__dirname, '../frontend/dist'))
);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});