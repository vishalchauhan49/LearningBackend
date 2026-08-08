const express = require("express");
const adminRouter=express.Router();
const { z } = require("zod");
const { adminmodel ,eventmodel } = require("../db");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const { INVALID } = require("zod/v3");
const ADMIN_JWT_SECRET="example2";


async function authmiddlware(req,res,next){

   const admintoken= req.headers.admintoken;
   
   const verified_data= jwt.verify(admintoken,ADMIN_JWT_SECRET);

    if(!verified_data)
    {
      res.json({Error:"Not authorised"});
    }


const admin= await adminmodel.findOne({

   _id:verified_data.id
     
});
req.copiedData=admin._id;
next();

}


adminRouter.post("/signup",async(req,res,next)=>{


// Deciding the format of input from the user using "ZOD"
const desiredFormat=z.object({

 name:z.string(),
 email:z.string(),
 password:z.string().min(3),

});

const result= desiredFormat.safeParse(req.body);

      if(!result.success)
    {
       res.json({Error_message:result.error.issues}); // This returns and array of errors 

    }


const { name , email , password } = result.data;
// console.log(name);
// console.log(email);
// console.log(password);


try {

 const founduser= await adminmodel.findOne({
        email:email
    });

       if(founduser)
       {

         throw new Error("User already exists , please signin ");

       }
 
   else{

       const hashed_password= await bcrypt.hash(password,4);
       console.log(hashed_password);
       

            await adminmodel.create({
             name:name,
             email:email,
             password:hashed_password,
             role:"admin"     
           });

    } 


    res.json({message:"signedUp successfully"});

  }
catch(error)
   {
     next(error);
   }    
});

adminRouter.post("/signin",async(req,res,next)=>{

try{
    const email=req.body.email;
    const password=req.body.password;

  const found= await adminmodel.findOne({
    email:email
  });
        
          if(!found)
          {

res.json({ERROR:"please signup first"});

          }


 const result= await bcrypt.compare(password,found.password);
 
    if(!result)
    {
       throw new Error("password is incorrect");
    }

const adminToken=jwt.sign({id:found._id.toString()},ADMIN_JWT_SECRET)

res.header({admin_token:adminToken});
res.json({Message:"Signed In successfully"});

    }
catch(err){

  next(err);


    }

});


adminRouter.post("/event",authmiddlware,(req,res,next)=>{

  const desiredFormat= z.object({
      title:z.string(),
      time:z.string(),
      venue:z.string(),
      description:z.string()
  }); 

  const result = desiredFormat.safeParse(req.body); 
    
    if(!result)
    {
      res.json({Error_message:result.error.issues});
    }

 
 const { title ,time,venue,description }= result.data;

  
const event = await eventmodel.create({

   title:title,
   time:time,
   venue:venue,
   description:description,
   createdby:req.copiedData


});
 res.json({Message:"successfully created an event "});
console.log(event);

});

adminRouter.put("/event",authmiddlware,async (req,res,next)=>{
 // .regex() is a custom method to check for type objectID 
 // z.string(): This tells Zod that the incoming data must be a text string.
 // .regex(...): This applies a Regular Expression (RegEx) rule to inspect the characters inside that string.
 // "Invalid ID": This is the custom error message Zod will throw if the string fails the RegEx rule. 
  
  const desiredFormat= z.object({
      eventId:z.string().regex(/^[0-9a-fA-F]{24}$/ , " INVALID ID"),
      newTitle:z.string(),
      newTime:z.string(),
      newVenue:z.string(),
      newDescription:z.string()
  }); 

const result = desiredFormat.safeParse(req.body);
   
   if(!result)
   {
    res.json({Error_message:result.error.issues});
   }
  
// Expecting admin to update all fields , eventually we will be adding more functions. 
// Like we will be accepting specific filed admin want to change.

try{
    const { eventId, newTitle ,newTime ,newVenue, newDescription } = result.data;
   
const found = await eventmodel.findOne({_id:eventId});

    if(found.createdby == req.copiedData)
    {
      const result = await eventmodel.findOneAndUpdate(
    {
   _id:req.copiedData,
      },  
    {
      $set:{title:newTitle , time:newTime , venue:newVenue , description:newDescription}
    
      },
    
         { new : true} 
);
    }

  
}catch(error){

next(error);

}    
});


adminRouter.delete("/event",authmiddlware,(req,res,next)=>{

    const desiredFormat = z.string().regex(/^[0-9a-fA-F{24}$]/);

    const result = desiredFormat.safeParse(req.body);  

       if(!result)
       {
        res.json({Error_message:result.error.issues});
       }
      
   try{    
  // getting event id from admin which he wants to delete  
       const { id } = result.data;
     const found = await eventmodel.findOne({_id:id});

       if(found.createdby == req.copiedData)
       {

       await eventmodel.findOneAndDelete({_id:id});
       res.json({Message:"succesfully deleted a event "});
       res.header({creatorId:creatorId});

       }
     else {

throw new Error("Access Denied");

     }  
   }catch(error){

    next(error);
   }


});

adminRouter.get("/event",(req,res,next)=>{
    
      const desiredFormat = z.string().regex(/^[0-9a-fA-F{24}$]/);

    const result = desiredFormat.safeParse(req.body);  

       if(!result)
       {
        res.json({Error_message:result.error.issues});
       }
      
   try{    
       const id= req.body.id;

    const returnedEvent =  await eventmodel.findOne({_id:id});   
    res.json(returnedEvent);

   }catch(error){

    next(error);
   }


});




adminRouter.use((err,req,res,next)=>{
    res.json({Error_message:err.message});
});



module.exports={

    adminRouter:adminRouter
}
