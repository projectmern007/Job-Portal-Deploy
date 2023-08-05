const mongoose=require('mongoose')
const AdminSchema=mongoose.Schema({
    username:String,
    password:String
})
const AdminData=mongoose.model('admindetail',AdminSchema);
module.exports=AdminData;