

//imports
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//env 
import dotenv from 'dotenv';
dotenv.config()

//mongodb connection
import connectToMongo from './databaseConnection.js' 
connectToMongo()

const app = express()

//necessary middlewares
app.use(cors());
app.use(express.json())     //to pass json in request.body
app.use(urlencoded({extended : true}))   // req.body can parse nested data from forms
app.use(cookieParser());
app.set("view engine" , "ejs")


//port
const PORT = process.env.PORT || 5000

//export the routers from our routes
import userRoutes from './routes/userRoutes.js'

//routes
app.get('/' , (req , res)=>{
    res.send("hello to my page")
})



//routing
app.use('/api/users' , userRoutes);


//connection to server
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
  })