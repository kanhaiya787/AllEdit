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

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', socket => {
  console.log('User connected username='+socket.handshake.query.username+" room="+socket.handshake.query.roomname)
  let data = fs.existsSync("data/"+socket.handshake.query.roomname+".txt")?JSON.parse(fs.readFileSync("data/"+socket.handshake.query.roomname+".txt")):[{"users":[]}];
  if(!fs.existsSync("data/"+socket.handshake.query.roomname+".txt")){
    fs.open("data/"+socket.handshake.query.roomname+".txt", ()=>console.log("file create error"));
  }
  userlist = data[0].users;
  if(!userlist.includes(socket.handshake.query.username)){
    userlist.push(socket.handshake.query.username)
  }
  data[0].users=userlist
  fs.writeFileSync("data/"+socket.handshake.query.roomname+".txt",JSON.stringify(data),(err)=>console.log(err))
  io.sockets.emit('send users', {"room":socket.handshake.query.roomname,"users":userlist});
  
  socket.on('disconnect', () => {
    console.log('User disconnected username='+socket.handshake.query.username+" room="+socket.handshake.query.roomname)
    let data = fs.existsSync("data/"+socket.handshake.query.roomname+".txt")?JSON.parse(fs.readFileSync("data/"+socket.handshake.query.roomname+".txt")):[{"users":[]}];
    if(!fs.existsSync("data/"+socket.handshake.query.roomname+".txt")){
      fs.open("data/"+socket.handshake.query.roomname+".txt", ()=>console.log("file create error"));
    }
    userlist = data[0].users;
    if(userlist.find((user)=>{return user===socket.handshake.query.username})){
      userlist=userlist.filter((user)=>{return !(user===socket.handshake.query.username)})
    }
    data[0].users=userlist
    fs.writeFileSync("data/"+socket.handshake.query.roomname+".txt",JSON.stringify(data),(err)=>console.log(err))
    io.sockets.emit('send users', userlist);
  })

  socket.on('save data', (text) => {
    var currdatetime = new Date();
    console.log(34,text+"   "+text.data+"  "+text.roomname);
    let data = fs.existsSync("data/"+text.roomname+".txt")?JSON.parse(fs.readFileSync("data/"+text.roomname+".txt")):[{"users":[]}];
    if(!fs.existsSync("data/"+text.roomname+".txt")){
      fs.open("data/"+text.roomname+".txt", ()=>console.log("file create error"));
    }
    data.push({"time":currdatetime.toString(),"data":text.data})
    fs.writeFileSync("data/"+text.roomname+".txt",JSON.stringify(data),(err)=>console.log(err))
    io.sockets.emit('send changes', text);
  })

  socket.on('send changes', (text) => {
    io.sockets.emit('send changes',{"room":text.roomname,"data":text.data})
  })
})



server.listen(port, () => console.log(`Listening on port ${port}`))