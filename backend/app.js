require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

const usersRouter = require('./routes/users');

app.use(express.json()); // if you plan to receive JSON data
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
