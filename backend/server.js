import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connecttoMongoDB from './db/connectToMongodb.js';

import { app, server } from './socket/socket.js';


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config(); // to run this port at 8000


// middleware
app.use(express.json()); // to parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());
//

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})
server.listen(PORT, ()=> {
    connecttoMongoDB();
    console.log(`Server is running on port ${PORT}`);
});