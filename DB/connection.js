//import mongoose

const mongoose=require('mongoose')

//get connection string from .env file
const connectionString=process.env.MONGO_URL;

//connect to mongodb using mongoose
mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB connected successfully");
}).catch((err)=>{
    console.log(`MongoDB connection failed due to ${err}`)
})