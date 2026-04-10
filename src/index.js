import app from "./server.js";
import mysqlConnection from "./configs/db.js";
import createJwtToken from "./configs/jwt.js";
import front_endRoter from "./routes/front_end.router.js"
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import adminRouter from "./routes/admin.router.js"
import docRouter from "./routes/docs.router.js";
import subjectRouter from "./routes/subjects.router.js"
import express from "express";
import examRouter from "./routes/exams.router.js"
import cookieParser from "cookie-parser";
import 'dotenv/config';


app.use(express.json());
app.use(cookieParser());
app.set('etag',false)

app.use((error, req, res, next) => {
  if (error) {
    console.log(error);
    
    
    return res.status(400).json({status:"Error",message:'invalid request'});
  }
  next();
});


app.use(front_endRoter)
app.use(authRouter)
app.use(userRouter)
app.use(adminRouter)
app.use(docRouter)
app.use(subjectRouter)
app.use(examRouter)

app.all("{/*dummy}",(req,res,next)=>{
    res.status(404);
    res.send('<h1>Not Found</h1>');
})