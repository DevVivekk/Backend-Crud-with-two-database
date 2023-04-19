const express = require('express')
const app = express();
const Fitnessmodel = require('./db');
const ExerciseModel = require('./db2')
app.use(express.json())
app.listen(4000);

//for get all datas by populating fitness in exercise db
app.get('/',async(req,res)=>{
    const data = await ExerciseModel.find({}).populate("Fitness")
    if(data.length===0){
        const find  = await Fitnessmodel.find({})
        res.status(201).json(find);
    }else{
    res.status(201).json(data);
    }
})

//posting fitness data to database:-
app.post('/submit',async(req,res)=>{
    try{
        const {ProgramName,ProgramId} = req.body;
        console.log(req.body)
        const check = await Fitnessmodel.findOne({ProgramId:ProgramId})
        if(check){
            return res.status(401).json("Id already exists")
        }else{
        const save = await new Fitnessmodel({ProgramName,ProgramId}).save();
        console.log(save)
        res.status(201).json("success");
        }
    }catch(e){
        console.log(e)
        return res.status(401).json(e);
    }
})
//updating fitness data by id
app.put('/update/:id',async(req,res)=>{
    try{
        const {id}  = req.params;
        const {ProgramName} = req.body;
        if(!id){
            return res.status(401).json({error:"no Id"})
        }else{
            const find = await Fitnessmodel.findById({_id:id})
            if(find){
                const update = await Fitnessmodel.findByIdAndUpdate({_id:id},{ProgramName},{new:true})
                res.status(201).json("sucessfully updated!")
            }else{
                return res.status(401).json('Failed request') 
            }
        }
    }catch(e){
        console.log(e);
        res.status(401).json(e)
    }
})

//deleting fitness by id
app.delete('/del/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const check = await Fitnessmodel.findById({_id:id});
        if(check){
            const del = await Fitnessmodel.findByIdAndDelete({_id:id})
            res.status(201).json("Successfully deleted!")
        }else{
            return res.status(401).json("error")
        }
    }catch(e){
        console.log(e)
        return res.status(401).json(e);
    }
})

//now comes to exercise part
//saving exercise data in exercise db
app.post('/exercise',async(req,res)=>{
    try{
        const exercise ={
            ExerciseId:req.body.ExerciseId,
            ExerciseName:req.body.ExerciseName,
            ExerciseLength:req.body.ExerciseLength
        }
        if(!exercise){
            return res.status(401).json("error")
        }else{
            const check = await Fitnessmodel.findById({_id:req.body.Fitness})
            if(check){
                const save = await new ExerciseModel({Exercises:exercise,Fitness:req.body.Fitness}).save();
                console.log(save);
                res.status(201).json("success")
            }else{
                return res.status(401).json("error")
            }
        }
    }catch(e){
        console.log(e)
        return res.status(401).json(e);
    }
})

//deleteing exercise data by id
app.delete('/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const check = await ExerciseModel.findById({_id:id});
        if(check){
            const del = await ExerciseModel.findByIdAndDelete({_id:id})
            res.status(201).json("Successfully deleted!")
        }else{
            return res.status(401).json("error")
        }
    }catch(e){
        console.log(e)
        return res.status(401).json(e);
    }
})