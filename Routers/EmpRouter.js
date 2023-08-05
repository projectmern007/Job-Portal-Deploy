const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const EmpModel=require('../Models/EmpModel');
const EmpregModel = require('../Models/RegemployerModel')



//post....empSignup api
router.post("/empsignup",async(req,res)=>{
  try{  
        const code = req.body.empregnum
        const regemp = await EmpregModel.findOne({empregnum:code})
        console.log(regemp)
        const emp=req.body;

        if(regemp)
        {
            const checkemp = await EmpModel.findOne({empregnum:code})
            
         if(!checkemp) 
         {
            newEmp= new EmpModel(emp);
            const savedata=await newEmp.save();
            res.status(200).json({message:"Added Emp details Successfully"})
         }
           else{
            res.status(200).json({message:"Employer Already registered!"})
           }
        }
        else{
            res.status(200).json({message:"Invalid! User not associated with ICTAK"})
        }
    }catch(error){
        res.status(400).json("Cannot add")
    }
})
//...get../viewemp
router.get('/viewemp',async(req,res)=>{
try{
    const data=await EmpModel.find();
    res.json(data)
}catch(error){res.json(error)}
})
module.exports=router;