const socket = io();
// only io will establish the connection from the server side

const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
// audio that will play on receive messages
var audio = new Audio('ting.mp3');

// Function to append event info to container
const append = (user, message, type, position) => {
    const messageElement = document.createElement('div');
    const messageContent = document.createElement('div');
    messageContent.innerHTML = message;
    if (type === 'message') {
        if (user !== 'You') {
            const messageTitle = document.createElement('div');
            messageTitle.innerHTML = user;
            messageTitle.classList.add('messageHead');
            messageElement.append(messageTitle);
        }
        messageElement.classList.add(position);
        messageElement.classList.add('message');
    } else if (type === 'joined' || type === 'disconnected') {
        messageElement.classList.add('centerNotify');
    }
    messageElement.append(messageContent);
    messageContainer.append(messageElement);
    if (position === 'left') {
        audio.play();
    }
};

// Ask new user for his/her name and let the server know so it can alert all
const userName = prompt("Enter your name to join");
// Let others know new user joined
socket.emit('new-user-joined', userName);

// If new user joined, receive event from the server
socket.on('user-joined', userName => {
    append(`${userName}`, `${userName} joined the chat`, 'joined', 'left');
});

// If user sends a message, receive it and append 
socket.on('receive', data => {
    append(`${data.name}`, `${data.message}`, 'message', 'left');
});

// If a user leaves chat, append the info to the container
    socket.on('left', userName => {
        append(`${userName}`, `${userName} left the chat`, 'disconnected', 'left');
    });
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;

    // Check if the user typed "bye"
    if (message.toLowerCase() === "bye") {
        append('You', `You left the chat`, 'disconnected', 'right');
        socket.emit('disconnect-user');
        socket.disconnect();
    } else {
        append('You', `${message}`, 'message', 'right');
        socket.emit('send', message);
    }

    messageInput.value = '';
});
