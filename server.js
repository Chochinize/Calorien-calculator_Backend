
import express from "express";
import ws from "ws";
import connectDB from "./utility/connectDB.js";
import cors from "cors";
import userRouter from './routes/userRouter.js'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();



// const ReadableStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf-8');
// ReadableStream.on('data', (chunk)=>{
//   console.log('new chunk recived')
//   console.log(chunk)
// })


const app = express();






dotenv.config();
const PORT =  5050;
connectDB()


app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}));
app.use(cookieParser());


console.log(';')


app.use('/u',userRouter);
app.get('/', (req,res)=>{
  res.cookie("token", 'abc', { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
  
})






const wsServer = new ws.Server({ noServer: true }); //initialize web socket server
wsServer.on("connection", (socket) => {
  console.log("client connected:");
 
  console.log(`new connection, ws.id=${socket.id}, ${socket._socket.remoteAddress}:${socket._socket.remotePort} #clients=${wsServer.clients.size}`);
  // console.log(socket)
  socket.on("message", (message) => {
    const objMessage =  JSON.parse(message)
    console.log('this is parsed message',objMessage);
     console.log(message)
    const strMessage = message.toString()
    
    console.log(objMessage.type )
    // switch(objMessage.type) {
    //   case "temp":
    //     console.log('sending types')
    //   case "light":
    //     // run light specific
    //   case "video":
    //     // stream video packets to somewhere...
    // }
    wsServer.clients.forEach((client) => {
      console.log(message);
      client.send(message);
      
    });
  });
});
console.log('first')
const server = app.listen(PORT); 
// server.on("upgrade", (request, socket, head) => {
//   wsServer.handleUpgrade(request, socket, head, (socket) => {
//     wsServer.emit("connection", socket, request);
//     console.log('server started');
//   });
// });
