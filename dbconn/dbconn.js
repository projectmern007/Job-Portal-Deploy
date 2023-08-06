const mongoose=require('mongoose');
require("dotenv").config()

const connstr = process.env.MONGO_DB
mongoose.connect(connstr)
.then(()=>{
    console.log('Connected to MongoDb');
})
.catch((error)=>{
    console.log("ERROR!!! Connection lost", error)
})