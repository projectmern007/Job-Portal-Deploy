const mongoose=require('mongoose')
const AlumniregSchema=mongoose.Schema({
    regnum:String
    
})
const AlumniregData=mongoose.model('alumniregdetail', AlumniregSchema);
module.exports=AlumniregData;