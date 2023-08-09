const express = require("express");
const app = new express();
const path = require("path");
const multer = require("multer");
const fs = require("fs").promises;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const connecttoDB= require("./dbconn/dbconn");

const JobModel = require("./Models/JoblistingModel");

app.use(morgan("dev"));

app.use(cors());

const empapi = require("./Routers/EmpRouter");
const jobs = require("./Routers/JobRoutes");
const jobres = require("./Routers/ResponseRouter");
const user = require("./Routers/UserRouter");
const login = require("./Routers/LoginRouter");
const { S3Uploadv2 } = require("./S3Service");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
app.use("/api", empapi);
app.use("/api", jobs);
app.use("/api", jobres);
app.use("/api", user);
app.use("/api", login);

const connstr = process.env.MONGO_DB

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname,'/build'))); 


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//         return cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/upload/:token", upload.single("resume"), async (req, res) => {
    try {
         
        const result = await S3Uploadv2(req.file)
            console.log(result.uploadname)
        // console.log(req.file);
        const filename = req.file.filename;
        const responderid = req.body.responderid;
        const path = result.uploadname;
        const username = req.body.username;
        const emailid = req.body.emailid;
        const posterid = req.body.posterid;
        const jobId = req.body.jobId;
        const token = req.params.token;
        // console.log(req.body.posterid);
        const response = {
            responsetype: "pdf",
            path: path,
            responderid: responderid,
            username: username,
            emailid: emailid,
        };
        // console.log(response);
        let user = await JobModel.findOne({ _id: jobId, "responses.responderid": responderid });
        jwt.verify(token, "ictuser", async (error, decoded) => {
            if (decoded && decoded.email) {
                if (!user) {
                    const data = JobModel.findByIdAndUpdate(jobId, {
                        $push: {
                            responses: response, // {responsetype:type , path:fpath}
                        },
                    }).exec();
                    res.status(200).json({ message: "File Uploaded" });
                } else {
                   
                    res.status(200).json({ message: `alredy applied` });
                }
            } else {
                res.json({ message: "Unauthorised User" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "cannot upload" });
    }
});


//to download file

app.get("/api/download/:path", async (req, res) => {
    const filename = req.params.path;

    try {
        let file = await s3.getObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
          }).promise()
          console.log(file)
        res.send(file.Body);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Server error" });
    }
});


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname
    ,'/build/index.html')); });


    (async () => {
        try {
            await connecttoDB(); //waits for db conn before starting sever, to minimize db connection bugs in cyclic
            app.listen(PORT, () => {
                console.log(`Server is running at ${PORT}`);
            });
        } catch (error) {
            console.log("Error starting server:", error);
        }
    })();
    
    