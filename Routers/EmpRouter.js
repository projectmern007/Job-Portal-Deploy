const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const EmpModel=require('../Models/EmpModel');
const EmpregModel = require('../Models/RegemployerModel')
const UserModel = require('../Models/UserModel')


//post....empSignup api
router.post("/empsignup",async(req,res)=>{
  try{  
        const code = req.body.empregnum
        const username= req.body.username
        const regemp = await EmpregModel.findOne({empregnum:code})
        console.log(regemp)
        const emp=req.body;

        if(regemp)
        {
            const checkemp = await EmpModel.findOne({empregnum:code})
            
         if(!checkemp) 
         {   
            const checkusername= (await EmpModel.findOne({username:username})|| await UserModel.findOne({username:username}))
             if(!checkusername)
             {
            newEmp= new EmpModel(emp);
            const savedata= await newEmp.save();
            res.status(200).json({message:"Added Emp details Successfully"})
             }
            else{
                  res.status(200).json({message:"Username already taken, choose another username"})
                }
          
         }
           else{
            res.status(200).json({message:"Employer Already registered!"})
           }
        }
        else{
            res.status(200).json({message:"Invalid! User not associated with ICTAK"})
        }
    }catch(error){
        console.log(error)
        res.status(400).json("Server error")
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