const express = require("express");
const router = express.Router();
const jwt=require("jsonwebtoken")

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const JobModel = require("../Models/JoblistingModel");

//api for adding the jobs
router.post("/addjob", async (req, res) => {
    try {
        const job = req.body;
        jwt.verify(req.body.token,"ictjp",(error,decoded)=>{
            if (decoded && decoded.email) {
                JobModel(job).save();
        res.json({message:"Job added sucessfully!!"})  
            } else {
                res.status(200).json({ message: "unauthorised user" })
            }
        })
        
    } catch (err) {
        res.status(404).json({ message: `Cannot add job ERR`, error:err  });
    }
});
//api for getting alljobs at homepage
router.get("/viewjobs",async(req,res)=>{
    try {
        const data = await JobModel.find({}, {responses:0});
        res.json(data)
    } catch (error) {
       res.status(404).json({Message:"error",error}) 
    }
})

//api for getting all the jobs
router.get("/viewjobs/:token", async (req, res) => {
    const data = await JobModel.find({}, {responses:0});
    
    try {
        jwt.verify(req.params.token,"ictjp",(error,decoded)=>{
            if(decoded && decoded.email){

                res.json(data)
            }
            else{
                res.status(400).json({message:"Unauthorised user"},decoded,decoded.email)
            }
        })
        
    } catch (err) {
        res.status(404).json({ mesaage: `Cannot get Jobs ${err}` });
    }
});
//api for getting all jobs posted by a particular employee
router.get("/viewjobs/:id/:token",async(req,res)=>{
    const posterid=req.params.id;
    console.log("posterid"+posterid)
    const data=await JobModel.find();
    try {
        jwt.verify(req.params.token,"ictjp",(error,decoded)=>{
            if(decoded && decoded.email){
                const emposts=[]
        data.forEach(element => {
        if(element.posterid==posterid){
            emposts.push(element)
        }
       
     });
    res.send(emposts);
          
            }
            else{
                res.status(400).json({message:"Unauthorised user"})
            }
        })
      
    } catch (err) {
        console.log(err)
    }
    
})
//api for updating the jobs
router.put("/update/:id/:token", (req, res) => {
    let id=req.params.id;
    let token=req.params.token
    const newData = req.body;
    try {
        jwt.verify(token,"ictjp",(error,decoded)=>{
            if (decoded && decoded.email) {
                const data =  JobModel.findByIdAndUpdate(id, {
                    $set: {
                        companyname: newData.companyname,
                        jobrequirements: newData.jobrequirements,
                        jobtitle: newData.jobtitle,
                        jobdesc: newData.jobdesc,
                        eligibility:newData.eligibility,
                        experience: newData.experience,
                        salary: newData.salary,
                        location: newData.location,
                        ExpiresAt: newData.ExpiresAt
                    },
                }).exec();
                res.status(200).json({ message: "Job Details Updated Successfully" });

            }
            else {
                res.json({message:"unauthorised user"})
            }
        })      
      
        
    } catch (error) {
        res.status(404).json({ message: "Error!! Update not Successfull", err:error });
        
    }
});
//api for deleting the jobs

router.delete("/deletejob/:id/:token",  (req, res) => {
    try {
       let jobid = req.params.id;
       let token=req.params.token
        // console.log(pos)
        jwt.verify(token,"ictjp",(error,decoded)=>{
            if (decoded && decoded.email) {
        const data =  JobModel.findOneAndDelete({ _id: jobid }).exec();
        res.status(200).send({ message: "Job deleted Successfully" });
            }
            else{res.json({messagfe:"Unauthorised user"})}
        })
    } catch (error) {
        res.status(404).json({ message: "Error!! Deletion not completed" });
        console.log(error);
    }
});
//api for finding one particular student  in joblisting  
router.post('/findinresponse/:id',async(req,res)=>{
    let id=req.params.id
    let user=await UserModel.findOne({_id:id})
    if(user){
        res.status(200).json({message:"user exists"})
   
    }

})    

module.exports = router;
