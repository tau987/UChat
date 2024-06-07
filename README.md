In this project, you've developed a real-time chat application called iChat using Node.js, Express, and Socket.io. The application allows users to join a chat room, send messages, and receive notifications when other users join or leave the chat.

Key Features:
Real-time Messaging: Users can send and receive messages in real-time.
User Join/Leave Notifications: Notifications are displayed when users join or leave the chat room.
Sound Notifications: An audio notification plays whenever a new message is received.
Technical Implementation:
Server-Side:

Set up an Express server to serve static files and handle the root URL.
Used Socket.io to manage real-time communication between the server and clients.
Handled events for new user connections, message broadcasts, and user disconnections.
Client-Side:

Established a Socket.io connection to the server.
Implemented a user interface to display messages and notifications dynamically.
Managed user inputs and form submissions to send messages.
Included sound notifications for incoming messages.
