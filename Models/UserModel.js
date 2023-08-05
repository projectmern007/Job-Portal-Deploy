const mongoose=require('mongoose')
const UserSchema= mongoose.Schema({
   
    name:String,
    regnum:String,
    emailid:String,
    phone:String,
    Qualification:String,
    username:String,
    password:String
});
const UserData= mongoose.model("StudentUser",UserSchema);
module.exports=UserData;