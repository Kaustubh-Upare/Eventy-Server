const { tryCatcher } = require("../Middleware/error.js");
const Event=require('../Models/Event.js');
const { emitEvent } = require("../utility/features.js");
const {ErrorHandler}=require("../utility/EHandler.js")

const createEvent=tryCatcher(async(req,res,next)=>{
    const event=await Event.create({...req.body,organizer:req.user});
    emitEvent(req,"EventCreation","Comedack","Event is Created");

    return res.status(201).json(event)
});

const getMyEvent=tryCatcher(async(req,res,next)=>{
    const events=await Event.find({organizer:req.user}).populate('organizer','name')
    res.json(events);
})

const updateMyEvent=tryCatcher(async(req,res,next)=>{
    const event= await Event.findById(req.params.id)
    
    if(Event.organizer.toString() !== req.user.toString()) return next(new ErrorHandler("You are not allowed to edit this",403))
    if(!event) return next(new ErrorHandler("No Event Is There Right Now",403))

    emitEvent(req,"Event Updated",event)
    res.status(200).json({
        msg:"Updated Event",
        event
    })
});

const deleteEvent=tryCatcher(async(req,res,next)=>{
    const event = await Event.findById(req.params.id);

    if(!event) return next(new ErrorHandler("No Event Is There Right Now",403))

    if(Event.organizer.toString() !== req.user.toString()) return next(new ErrorHandler("You are not Authorize to Modify it",403))
        
    await event.deleteOne();
    emitEvent(req,"Event Deleted",event.attendees,"Event is Ended By Owner");
    res.status(201).json({
        message:"Event Deleted Succesfully"
    })

})

module.exports={createEvent,getMyEvent,updateMyEvent,deleteEvent}