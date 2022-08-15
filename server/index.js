
import dotenv from 'dotenv'
 dotenv.config()
 import express from 'express'
 import mongoose from 'mongoose'
 import cors from 'cors'
 import bodyParser from 'body-parser'
 import connectDB  from './database/db.js'
 import authRouter  from './Routers/authRouter.js'
 import userRouter from './Routers/userRouter.js'
 import postRouter from './Routers/postRouter.js'
 import uploadRouter from './Routers/uploadRouter.js'
  const app=express()
   


  // serving static images
  app.use(express.static('public'))
  app.use('/images',express.static('images'))
  // middleware for cros
    app.use(cors())
  // middleware for Parse incoming request bodies
     app.use(bodyParser.json({limit:'30mb',extended:true}))
    app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// routers
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/upload", uploadRouter);

 const PORT = process.env.PORT || 5000
  const start=async()=>{
    try {
     // connect DB
      await connectDB(process.env.MONGO_URL);
    app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
  })
    } catch (error) {
       console.log(error) 
    }
  }

start()