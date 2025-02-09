require('dotenv').config();
const jwt=require('jsonwebtoken')

cookieOption={
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly:true,
    secure:true
}

const sendToken=(res,user,code,msg)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);

    return res.status(code).cookie('EventToken',token,cookieOption).json({
        success:true,
        msg
    })

}

const emitEvent=(req,event,users,data)=>{
    console.log("emitting Event");
    const io=req.app.get("io");
}

module.exports={sendToken,emitEvent}