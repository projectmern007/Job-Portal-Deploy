require("dotenv").config();
const AWS = require("aws-sdk");
const s3 = new AWS.S3()


exports.S3Uploadv2 = async (file)=>{
    const param = {
      Bucket:process.env.AWS_BUCKET_NAME,
      Key:`${Date.now()}-${file.originalname}`,
      Body: file.buffer
     
    }
   const uploadresult = await s3.putObject(param).promise();
   const uploadname = param.Key

   return{
    uploadresult,
    uploadname
   }
}


