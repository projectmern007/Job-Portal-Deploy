const mongoose = require ('mongoose')
const RegempSchema = mongoose.Schema({
    empregnum:String,
    companyname:String
})

const RegempModel = mongoose.model('registeredemployer', RegempSchema)
module.exports = RegempModel;