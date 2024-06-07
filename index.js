const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = {};

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Serve the HTML file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', socket => {
    // If any new user joins, let other users connected to the server know
    socket.on('new-user-joined', userName => {
        users[socket.id] = userName; // users array updated
        socket.broadcast.emit('user-joined', userName);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    // If someone leaves the chat, let others know
    socket.on('disconnect-user', () => {
        const userName = users[socket.id];
        if (userName) {
            socket.broadcast.emit('left', userName);
            delete users[socket.id];
        }
    });

    // If someone leaves the chat, let others know
    socket.on('disconnect-user', () => { // Disconnect event is built-in, not custom named
        const userName = users[socket.id];
        if (userName) {
            socket.broadcast.emit('left', userName);
            delete users[socket.id];
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
