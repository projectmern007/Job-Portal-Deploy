const mongoose=require('mongoose');


mongoose.connect('mongodb+srv://Varsha:finalprova@cluster0.hjfajgo.mongodb.net/Jobportal')
.then(()=>{
    console.log('Connected to MongoDb');
})
.catch((error)=>{
    console.log("ERROR!!! Connection lost", error)
})