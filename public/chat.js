const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = localStorage.getItem('nombre');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function () {
    socket.emit('chat:message', {
        message: message.value,
        username: username
    });
    message.value = "";
});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username);
    message.innerText = '';
});

socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} esta escribiendo</em></p>`
});

socket.on('is:online', function (data) {
    message.innerHTML += `<p><strong>${data}</strong> se ha unido</p>`
    console.log("se ha unido" + data)
});

