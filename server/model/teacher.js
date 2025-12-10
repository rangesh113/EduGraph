const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    
    teachid:String,
    password:String,
    name:String,
    subject:String
})

const TeacherModel = mongoose.model("teachersid",TeacherSchema)
module.exports = TeacherModel

