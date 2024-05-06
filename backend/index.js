import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'  
dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{  
    console.log(err);  
})

const app = express()

const port = process.env.PORT||3000

app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
})   