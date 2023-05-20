const express = require("express")
const mongoose = require("mongoose")
const app =express()
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/Project1",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(()=>{
    console.log("db connect");
    
}).catch((err)=>{
    console.log("err",err);
})

const router = require("./route/projectRoute")
app.use(router)
app.listen(80,()=>{   //  port number 80 because if we want to see images on chrome
    console.log("server is running on port no. 80");
})
