const path = require('path');
const express = require('express');
const { constants } = require('crypto');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join((__dirname, 'public'))));

//start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);


io.on('connection', (socket) => {
    console.log("new connection", socket.id);

    socket.on("username", (data) => {
        console.log("conectando un usuario")
        console.log(data)
        io.sockets.emit('is:online', data);
    })

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
});

