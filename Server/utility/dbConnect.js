const mongoose=require('mongoose');


const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,  
    })
    .then(d=>console.log("Connected to dB"))
    .catch((err)=>{
        throw err;
    })
}
module.exports=connectDB;
