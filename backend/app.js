require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;
app.use(cors());

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const groupRouter = require('./routes/groups');
const eventRouter = require('./routes/events');
const userEvents = require('./routes/userEvents');

app.use(express.json());
app.use('/', userEvents);
app.use('/events', eventRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/groups', groupRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});