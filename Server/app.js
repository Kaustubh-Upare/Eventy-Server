const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser')

const userRoute=require('./Routes/user.js');
const eventRoute=require('./Routes/event.js');

const connectDB = require('./utility/dbConnect.js');
const {Server}=require("socket.io");
const {createServer}=require("http");

// Database Connection
connectDB();
const app=express();

const corsOption={
    origin:["http://localhost:5173","http://localhost:4173","http://localhost:3000"],
    credentials:true
};
const server=createServer(app);
const io=new Server(server,{
    cors:corsOption
})


app.set("io",io)


app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

// Routes
app.use('/user',userRoute)
app.use('/events',eventRoute)


app.get("/",(req,res,next)=>{
    res.send("Working Aboslutely Fine");
})

io.use((socket,next)=>{
    cookieParser()(socket.request,socket.request.res,async(er)=>{
        await socketAuthenticator(socket,er,next);
    })
})

io.on('connection',(socket)=>{
    //Things to Do Here 
})