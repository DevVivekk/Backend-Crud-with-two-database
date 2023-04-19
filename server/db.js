const mongoose = require("mongoose");
const dotenv = require("dotenv")
require('dotenv').config()
mongoose.connect(process.env.MONGO)
.then((res)=>{
    console.log("connected!")
}).catch((e)=>{
    console.log(e);
})

const FitnessSchema = new mongoose.Schema({
    ProgramId:{
        type:String,
        unique:true
    },
    ProgramName:{
        type:String,
    }
})

const Fitnessmodel = mongoose.model("Fitness",FitnessSchema)
module.exports = Fitnessmodel;