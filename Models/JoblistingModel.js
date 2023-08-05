const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    posterid: String,
    companyname: String,
    jobtitle: String,
    jobdesc: String,
    jobrequirements: String,
    eligibility:String,
    experience: Number,
    salary: String,
    location: String,
    responses: {
        type: [
            {
                responderid: {
                    type: String,
                    required: false,
                },

                username:{
                    type:String,
                    required: false
                },
                emailid:{
                    type:String,
                    required: false
                },

                responsetype: {
                    type: String,
                    enum: ["link", "pdf"],
                    required: false,
                },
                path: {
                    type: String,
                    required: false,
                },
                Verified: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        default: [],
    },
    CreatedAt: {
        type: Date,
        default: new Date(),
    },
    ExpiresAt: Date,
});

const JobModel = mongoose.model("joblisting", JobSchema);

module.exports = JobModel;
