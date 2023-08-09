const express= require ('express');
const router= express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const UserModel=require('../Models/UserModel');
const EmpModel=require('../Models/EmpModel');
const AdminModel=require('../Models/Adminmodel');

const jwt=require("jsonwebtoken")

router.post('/login',async(req,res)=>{
    let password=req.body.password;
    let username=req.body.username;
    
    let user=await UserModel.findOne({username:username})
   
    try {
        if (!user) {
            let emp= await EmpModel.findOne({username:username})
           
            if (!emp) {
                 let admin=await AdminModel.findOne({username:username})
                if (!admin) {
                    
                    res.json({message:"No such User"})

                } else {
                    if(admin.password==password){
                        jwt.sign({email:username,id:admin._id},"ictjp",{expiresIn:'1d'},
            (error,token)=>{
                if (error) {
                    res.json({message:"Token not generated"})
                } else {
                    res.json({message:"Admin Login suceesfull",token:token,data:admin})
                }
            })
                    }

                    else{
                        console.log("password");
                        res.status(200).json({message:"Incorrect Password"}) 
                    }
                }  
            } else {
                console.log("empname");
                if(emp.password==password){
                    jwt.sign({email:username,id:emp._id},"ictjp",{expiresIn:'1d'},
                    (error,token)=>{
                        if (error) {
                            res.json({message:"Token not generated"})
                        } else {
                            res.json({message:"Employer Login successful",token:token,data:emp})
                        }
                    })
                }

                else{
                    res.status(200).json({message:"Incorrect Password"}) 
                } 
            }
            
        } else {
            console.log("usernme");
            if(user.password==password){
                jwt.sign({email:username,id:user._id},"ictuser",{expiresIn:'1d'},
                (error,token)=>{
                    
                    if (error) {
                        res.json({message:"Token not generated"})
                    } else {
                        res.json({message:"Alumni Login suceesfull",token:token,data:user})
                    }
                })
            }
            
            else{
                res.status(200).json({message:"Incorrect Password"}) 
            } 
        }
    } catch (error) {
        res.json({message:"Un-authorised Login"});
    }
    
})

module.exports=router;