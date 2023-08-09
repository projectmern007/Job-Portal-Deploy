const express= require ('express');
const router= express.Router();
const jwt=require("jsonwebtoken")

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const UserModel=require('../Models/UserModel');
const StudProfModel=require('../Models/StudProfModel');
const AlumniregModel=require('../Models/AlumniregModel');
const EmpModel =require("../Models/EmpModel")
// User Sign Up
router.post('/userSignUp', async(req,res)=>{
    try {
        let user= req.body;
        let regnum=req.body.regnum;
        let username= req.body.username;
        let alumni = await AlumniregModel.findOne({regnum:regnum});
        if (alumni) {
            let alrdyReg = await UserModel.findOne({regnum:regnum});
            if (alrdyReg) {

            
                console.log("you are alredy registerd")
                res.json({message:"Already registered"});
            } else {
                const checkusername= (await EmpModel.findOne({username:username})|| await UserModel.findOne({username:username}))

                if (!checkusername) {
                    let newUser= await UserModel(user);
                    newUser.save();
                    res.json({message:"user saved successfully"});
                    console.log("saved");


                    
                } else {

                      res.status(200).json({message:"Username already taken, choose another username"});
                }
 

               
            }
      //THEN NOT AN ALUMNI  
        } else {
            console.log("not an alumni");
            res.json({message:"Sorry!!! Not a Student of ICTAK, Kerala"});
        }
        
    } catch (error) {
        res.json(error);
        console.log(error);
    }
   
})

// student profile creation and updation
router.post("/studendProfile", async(req,res)=>{
    try {
        let token=req.params.token
        let prof=req.body.data;
        let alid=req.body.alumniId;
        let newdata={
            "alumniId":alid,
            prof,  
        }

       
        let alreadyProf= await StudProfModel.findOne({alumniId:alid});
        
        if (alreadyProf) {
            
        res.json({message:"Profile already created"})

        // creation of profile
        } else {
            console.log(newdata);
            let profdata= await StudProfModel(newdata).save();
            res.json({message:"profile saved successfully"});
            console.log("profile saved successfully")
        }
        
    } catch (error) {
        res.json({message:"failed to saved "});
    }  
  
})

//api for checking if profile exists and viewing it
router.post('/checkprofile/:id', async(req, res)=>{

    try {
        const alumid = req.params.id
   
        const data = await StudProfModel.findOne({alumniId:alumid})
        if(data)
        {
           res.status(200).json({ data:data , message:'profile already created'})
        }
        else{
            res.status(200).json({  message:'profile not created'})
        }
       
    } catch (error) {
        console.log(error)
        res.status(400).json({message:'error'})
        
    }

})

//api for finding one particular student    
router.post('/findalumni/:id',async(req,res)=>{
    let id=req.params.id
    let user=await UserModel.findOne({_id:id})
    if(user){
        res.status(200).json({message:"user exists"})
   
    }

})    

module.exports=router;