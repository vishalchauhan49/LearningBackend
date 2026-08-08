const express=require("express");
const eventRouter=express.Router();
const { eventmodel }=require("../db");




eventRouter.get("/all",async (req,res,next)=>{
   
    const events= await eventmodel.find({});
    console.log(events);

});


eventRouter.get("/one",async (req,res,next)=>{

const eventId=req.headers.eventId;

   const single= await eventmodel.findOne({_id:eventId});

});



module.exports={

eventRouter:eventRouter
}