const jwt=require('jsonwebtoken');
const { tryCatcher } = require('./error.js');
const {ErrorHandler} = require('../utility/EHandler.js');
const User = require('../Models/User.js');

require('dotenv').config();

const isAuth=tryCatcher(async(req,res,next)=>{
    const token=req.cookies['EventToken'];

    if(!token) return next(new ErrorHandler("Please Login/Register to Access this",403));

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decodedData._id;
    next()

})

const socketAuthenticator=async(socket,err,next)=>{
    try{
        if(err) return next(err);
        const authToken=req.cookies['EventToken'];
        if(!authToken) return next(new ErrorHandler("Please Login TO This Route",401));
        const decodedData=jwt.verify(authToken,process.env.JWT_SECRET);
        const uso=await User.findById(decodedData._id);
        socket.user=uso;
        return next();
    } catch(error){
        return next(new ErrorHandler("Please Login To access THis Route",401));
    }
}

module.exports={isAuth,socketAuthenticator}