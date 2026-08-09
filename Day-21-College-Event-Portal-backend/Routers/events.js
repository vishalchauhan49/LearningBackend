const express=require("express");
const eventRouter=express.Router();
const { eventmodel }=require("../db");




eventRouter.get("/all",async(req,res,next)=>{
   
    try{
    const events= await eventmodel.find({});
      
       if(events.length>0)
       {
        res.json({Events:events});
       }
       else{

throw new Error("No events till now ");

       }
    }catch(error)
    {
        next(error);
    }
    

});


eventRouter.get("/one",async (req,res,next)=>{

const eventId=req.headers.eventid;

   try{
   const one= await eventmodel.findOne({_id:eventId});
  console.log(one);
  
    if(one)
    {
        res.json({Message:one});
    }
    else{

 throw new Error("Empty");

    }
}catch(error){
 next(error);

}


});

eventRouter.use((err,req,res,next)=>{

 res.json({Error_message:err.message});
 


})

module.exports={

eventRouter:eventRouter
}