const { Socket } = require('socket.io')

const io = require('socket.io')(8000)

const express = require('express')
const cors = require('cors')
const app = express;

const users = {}

io.on('connection',Socket =>{
    Socket.on('new-user-joined',name=>{
        users[Socket.id] = name;
        Socket.broadcast.emit('user-joined',name)
    });

    Socket.on('send',message =>{
        Socket.broadcast.emit('recieve',{message: message , name:users[Socket.id]})
    });
})