//connecting to mongodb server
import mongoose, { connect } from 'mongoose';
const { Schema } = mongoose;

import dotenv from 'dotenv';
dotenv.config()

connectToMongo().then(console.log("Connected to mongo")).catch(err => console.log(err));

async function connectToMongo() {
  await connect(process.env.MONGO_URI); 
}

//export the module to index.js
export default connectToMongo




