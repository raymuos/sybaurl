const mongoose = require("mongoose");
require('dotenv').config();

async function connectMongoDb(){
    return mongoose.connect(process.env.DATABASE_URL);
}

module.exports = {
    connectMongoDb, 
};