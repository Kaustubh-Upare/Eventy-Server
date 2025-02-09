const User=require('../Models/User.js');
const bcrypt=require('bcryptjs');
const {tryCatcher}=require('../Middleware/error.js');
const { sendToken } = require('../utility/features.js');

const registerUser=tryCatcher(async(req,res,next)=>{
    const {name,email,password}=req.body;

    const userIsThere=await User.findOne({email});
    if(userIsThere) return res.status(400).json({message:"User is Already Have Account"});

    const usero=await User.create({
        name,
        email,
        password
    })

    sendToken(res,usero,201,"User Created");
    res.status(201).json({message:"User Created Succesfully"})
})

const loginUser=tryCatcher(async(req,res,next)=>{
    const {email,password}=req.body;
    const usero=await User.findOne({email}).select("+password");

    if(!usero) return next(new ErrorHandler("Invalid Username",400))

    const isMatch=await bcrypt.compare(password,User.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Username",400));

    sendToken(res,usero,201,"Welcome Back");

})

module.exports={registerUser,loginUser}