const express= require('express');
const app= express();
const cors= require("cors");
const mongoose=require('mongoose');
const {notFound, errorHandler}= require('./middlewares/ErrorHandler');
const constituentRoutes= require('./routes/constituents');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/constituents',constituentRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
const mongodbURL= process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/constituent_database'

main().catch(err => console.log(err))
async function main() {
  await mongoose.connect(mongodbURL);
  console.log("connected");
}

//server
const server = app.listen(port,()=>{
    console.log(`APP IS LISTENING ON PORT ${port}`);
});

module.exports = server;