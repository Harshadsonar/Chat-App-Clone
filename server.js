// import express
const express = require('express');

// make an express app
const app = express();

// making server using http and express;
const server = require('http').Server(app);

app.use(express.static('public'));

// integrating server with socket.io 
const io = require('socket.io')(server);

// server will be having io
io.on('connection', (socket) => {
        console.log('connection established', socket.id);

        // socketA -> io -> socketB
        // socketA user is triggering a message event
        socket.on('message', (data) => { // user sending message
                io.emit('message', data); // emitting this message to
                // all other sockets
            })
            // showing off that user left the chat
        socket.on('disconnect', () => {
            console.log(socket.id, '->left the chat');
        })
    })
    // it will pick index.html
const PORT = 9000;

server.listen(PORT, () => {
    console.log(`server is running on PORT ${9000}`);
})