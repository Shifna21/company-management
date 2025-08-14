const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
const authRouter = require('./router/authRouter')
const companyRouter= require('./router/companyRouter')



const DB_URL=process.env.DB_URL
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/upload",express.static("uploads"));


app.use("/auth", authRouter)
app.use("/company", companyRouter)




mongoose.connect(DB_URL)
.then(()=>console.log("db connected"))
.catch((error)=>console.log("error connection",error))

app.listen(PORT,()=>{
    console.log("listen:",PORT)
})