//mongodb
 import connectToMongo from './databaseConnection.js' 
 connectToMongo()

//express and cors
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()


const app = express()
app.use(json())
app.use(urlencoded({extended : true}))
app.set("view engine" , "ejs")


//port
const PORT = process.env.PORT || 5000

//export the router


//cors
app.use(cors());


//routes
app.get('/' , (req , res)=>{
    res.send("hello to my page")
})

//routing

//connect
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
  })