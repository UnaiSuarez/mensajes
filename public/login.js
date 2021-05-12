let username = document.getElementById('username');
let password = document.getElementById('password')
let btn = document.getElementById('send');

const socket = io();


btn.addEventListener('click', function () {
    if (password.value == "a") {
        window.open("mensajes.html")
    }
    localStorage.setItem('nombre', username.value);
    socket.emit('username', localStorage.getItem('nombre'));
})