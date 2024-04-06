const socket = require('socket.io')

let io;

function intitializesSocket(server) {
    io = socket(server)
    io.on('connection', (socket) => {
        console.log("A user connected");
        var senderName;

        socket.on('name msg', (msg) => {
            io.emit('chat msg', msg);
        });

        socket.on('chat message',(name,msg)=>{
            senderName=name;
            io.emit('chat',name, msg);
        });
        socket.on('disconnect',()=>{
            console.log("A user disconnected");
            io.emit('user disconnected',senderName);
        });

    });
}

module.exports={
    intitializesSocket,
    io,
};