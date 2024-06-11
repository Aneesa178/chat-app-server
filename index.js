//1)imporvt env
require("dotenv").config();

//2)import express
const express = require("express");

//3)import connection
require('./DB/connection')

//4)import cors
const cors = require("cors");
const userRoutes = require('./routes/userRoutes')
const messageRoute = require('./routes/messagesRoute')
//5)Server creation
const app = express();

const socket = require("socket.io");

//6)apply cors to the created server.to connect front n backend.
app.use(cors());

//7)use a middleware called express.json() to convert json data to javascript object
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoute);
//8)Define port number
const PORT = 4000 || process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`Server is running in PORT ${PORT}`);
})


app.get('/', (req, res) => {
    res.send('Project is running on port 4000')
})


const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        console.log("sendmsg",{data});
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) { //if user is online
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});
