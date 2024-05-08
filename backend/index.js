import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoute.js";
import userAuthRoutes from "./Routes/userAuth.js";
import cookieParser from "cookie-parser";
import adminRouter from "./Routes/AdminRoutes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api/userAuth", userAuthRoutes);
app.use("/api/admin", adminRouter);


app.use((err, req,res,next)=>{
    const statusCode = err.statusCode||500
    const message = err.message||"Internal server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})
