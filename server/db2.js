const mongoose = require("mongoose");
const dotenv = require('dotenv')
require("dotenv").config();
const {ObjectId} = mongoose.Schema.Types
mongoose.connect(process.env.MONGO)
.then((res)=>{
    console.log("connected!")
})
.catch((e)=>{
    console.log(e);
})

const ExerciseSchema = new mongoose.Schema({
    Fitness:{
        type:ObjectId,
        ref:'Fitness'
    },
    Exercises:[{
        ExerciseId:{
            type:Number
        },
        ExerciseName:{
            type:String,
        },
        ExerciseLength:{
            type:String
        }
    }]
})

const ExerciseModel = mongoose.model("Exercise",ExerciseSchema)
module.exports = ExerciseModel;