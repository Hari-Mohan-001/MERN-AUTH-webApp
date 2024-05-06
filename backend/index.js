import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose' 
import userRoutes from './Routes/userRoute.js' 
import userAuthRoutes from './Routes/userAuth.js' 
dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{  
    console.log(err);  
})

const app = express()
app.use(express.json())

const port = process.env.PORT||3000

app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
})   

app.use('/api/user' , userRoutes)
app.use('/api/userAuth' , userAuthRoutes)