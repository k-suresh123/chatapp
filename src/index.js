const path = require("path");
const http = require('http');
const express = require("express");
const socketio =require("socket.io");

const app = express();
const server = http.createServer(app);
//socket.io expect raw http server as argument
const io = socketio(server); 

const port = process.env.port ||3000
const publicDirPath = path.join("__dirname",'../public'); 

app.use(express.static(publicDirPath))

let count = 0;
//if we have 5 connection, below function maintain 5 new functions 
io.on('connection',(socket)=>{
    // socket is object consist information about connections
   console.log('New WebSocket connection');
   socket.emit('countUpdated',count);
   socket.on('increment',()=>{
          count++;
          // soket.emit reflect with current client
          //socket.emit('countUpdated',count);
          //io.emit communicate with all the clients
          io.emit('countUpdated',count)
   })
})

server.listen(port,()=>{
    console.log(`server started on ${port}`) 
})