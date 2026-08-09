const express = require("express");
const adminRouter=express.Router();
const { z } = require("zod");
const { adminmodel ,eventmodel } = require("../db");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const { INVALID } = require("zod/v3");
const ADMIN_JWT_SECRET="example2";


async function authmiddleware(req,res,next){

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
catch(error){

  next(error);


    }

});


adminRouter.post("/event",authmiddleware,async(req,res,next)=>{


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

 
 const { title ,time,venue,description } = result.data;
  
 try{

  const data=req.copiedData.toString(); 
  const is_present =  await adminmodel.findOne({_id:data});
  
    if(is_present)
    {
       const event = await eventmodel.create({
       title:title,
       time:time,
       venue:venue,
       description:description,
       createdby:req.copiedData
      });

         res.json({Message:"successfully created an event "});
         //console.log(event);
    }
    else{
        throw new Error("SIGN IN FIRST");
    }


 }catch(error){
     next(error);

}

});

adminRouter.put("/event",authmiddleware,async (req,res,next)=>{
 
 // getting eventid form admin in header

  const eventId= req.headers.eventid;
  
  

  const desiredFormat= z.object({
     // eventId:z.string(),
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
    const { newTitle ,newTime ,newVenue, newDescription } = result.data;
   
    const found = await eventmodel.findOne({_id:eventId});
    //console.log(found);
    //console.log(found.createdby);
    //console.log(req.copiedData);
  
  
    
// Both were in type :- objectId so we compared it by converting it into string.
// We can use built-in method of mongoose to comapre 2 objectId :- .equals() 

// if( found.createdBy.equals(req.copiedData)) { }
   
    if(found.createdby.toString() == req.copiedData.toString())
    {
      const result = await eventmodel.findOneAndUpdate(
    {
   _id:eventId,
      },  
    {
      $set:{title:newTitle , time:newTime , venue:newVenue , description:newDescription}
    
      },
    
         {returnDocument:"after"}
);
 res.json({Message:"successfully Updated event"});    

    }
    else{

throw new Error(" ACCESS DENIED ");


    }
    
  
}catch(error){

next(error);

}    
});


adminRouter.delete("/event",authmiddleware,async(req,res,next)=>{

// Accepting eventId from admin in headers and validating it using zod
    const desiredFormat= z.string();

    const result= desiredFormat.safeParse(req.headers.eventid);
   // console.log(result);
    

     if(!result){
        res.json({"Error_message":result.error.issues});
     }

   try{
    
    const found = await eventmodel.findOne({_id:result.data});

// We used this equals method to compare objectId , whereas we can convert both of them in string() but this is built-in function of mongoose (.equals());
   if(found.createdby.equals(req.copiedData))
   {     
    await eventmodel.findOneAndDelete({_id:result.data});
    res.json({Message:"Successfully Deleted Event"});
   }

   else{

throw new Error("ACCESS DENIED");

   }
   }catch(error){

    next(error);

   }  
});


adminRouter.get("/event",authmiddleware,async(req,res,next)=>{

  try{

    const data= req.copiedData;  
    // const data = "6a7882324ffebc26d96f8f72";

 // DOUBT:-
 // When i am searching an event by just only req.copiedData its giving correct answer .
 // When i am writing req.copiedData.toString() :- correct answer 
 // When i am writing just data= "6a7882324ffebc26d96f8f72" then :- correct answer 

 // Does automaticlly models are converting the data into type objectId , because in database _id's type is objectId .

    const events = await eventmodel.find({createdby:data});

     if((events.length)>0)
     {
      res.json({Message:events});
     }
     else{
  throw new Error("Having no events ");

     }
   
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

