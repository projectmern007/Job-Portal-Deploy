const mongoose=require('mongoose')
const ProfileSchema= mongoose.Schema({
    alumniId:String,
    prof:{
        name:String,
        stdId:String,
        emailid:String,
        phone:Number,
        Qualification:String,
        course:String,
        batch:String,
        placement:String,
        company:String
    }
    
   
})
const ProfileData= mongoose.model("profData",ProfileSchema);
module.exports=ProfileData;
