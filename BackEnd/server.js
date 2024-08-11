//imports
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary'
//export the routers from our routes
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

// import app and server from socket
import {app,server} from './socket/socket.js'
//env 
import dotenv from 'dotenv';
dotenv.config()

//mongodb connection
import connectToMongo from './databaseConnection.js' 
connectToMongo()

//cloudinary config
cloudinary.config({
cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
api_key : process.env.CLOUDINARY_API_KEY,
api_secret : process.env.CLOUDINARY_API_SECRET 
});


//const app = express()

//necessary middlewares
app.use(express.json({limit : "50mb"}))     //to pass json in request.body
app.use(urlencoded({extended : true}))   // req.body can parse nested data from forms
app.use(cookieParser());

//port
const PORT = process.env.PORT || 5000


//routes
app.get('/' , (req , res)=>{
    res.send("hello to my page")
})


//routing
app.use('/api/users' , userRoutes);
app.use('/api/posts' , postRoutes );
app.use('/api/messages' , messageRoutes );


//connection to server
//using server isntead of app , we can now use both http and socket server functionalities 
server.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
  })