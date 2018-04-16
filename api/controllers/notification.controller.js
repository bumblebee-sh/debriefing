const isocket = require('socket.io');

let users = {};

exports.init = server => {
    let io = isocket(server, {
        path: '/notification'
    });

    io.on('connection', function (socket) {
        socket.on('user id', function (data) {
            if (users[data] === undefined) users[data] = [];
            users[data].push(socket);
            // socket.emit('message', `I'm ${data} user`);
        });
    });
};

exports.send_notification = data => {
    console.log(Object.keys(users).length);
    if (users.hasOwnProperty(data.owner)) {
        users[data.owner].forEach( el => el.emit('message', {item : data}) );
    }
};

exports.logout = id => {
    users[id].forEach( el => el.disconnect());
    delete users[id];
};