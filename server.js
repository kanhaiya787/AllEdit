const express = require('express')
const http = require('http')
var cors = require('cors')
const socketIO = require('socket.io')
var fs = require('fs')
const { networkInterfaces } = require('os')

// our localhost port
const port = 4001

const app = express()
app.use(cors())

app.get('/get/:roomname',cors(),(req,res)=>{
  return res.send(JSON.parse(fs.readFileSync("data/"+req.params.roomname+'.txt')))
})

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('save data', (text) => {
    var currdatetime = new Date();
    let data = JSON.parse(fs.readFileSync("data/room1"+".txt"));
    data.push({"time":currdatetime.toString(),"data":text})
    fs.writeFileSync('data/room1.txt',JSON.stringify(data),(err)=>console.log(err))
    io.sockets.emit('send changes', text)
  })

  socket.on('send changes', (text) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    io.sockets.emit('send changes', text)
  })
})



server.listen(port, () => console.log(`Listening on port ${port}`))