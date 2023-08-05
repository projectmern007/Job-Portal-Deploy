const mongoose=require('mongoose')
const EmpSchema=mongoose.Schema({
    name:String,
    emailid:String,
    empregnum:String,
    phone:String,
    designation:String,
    companyName:String,
    location:String,
    username:String,
    password:String,
   
});
const EmpData=mongoose.model('employerdetail',EmpSchema);
module.exports=EmpData;