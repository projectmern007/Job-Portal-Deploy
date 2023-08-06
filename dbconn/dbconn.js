const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

const connstr = process.env.MONGO_DB;
const PORT = process.env.PORT;

const Connectmonogo = () => {
    return new Promise((resolve, reject) => {
        
        mongoose.connect(connstr)
            .then(() => {
                console.log("Connected to MongoDb");
                resolve();
            })
            .catch((error) => {
                console.log("ERROR!!! Connection lost", error);
                reject();
            });
    });
};
module.exports = Connectmonogo;
