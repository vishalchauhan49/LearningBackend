const express= require("express");
const userRouter= express.Router();
const { usermodel, eventmodel } = require("../db");
const { z, string, email } = require("zod");   // validation using zod 
const bcrypt=require("bcrypt");  // password hashing 
const jwt = require("jsonwebtoken");
const users_jwt_secret="example2";





userRouter.post("/signup", async(req,res,next)=>{

  // creating a format for the data which is acceptable using zod 
const desiredFormat= z.object({
   name : z.string(),
   password : z.string().min(3).max(12),
   email : z.string(),
   
})

// checking whether user is sending data of right format before sending it to server 
const result=desiredFormat.safeParse(req.body);

   if(!result.success){

 res.json({error_message:result.error.issues});

   }  


  const  {name ,password ,email} = result.data;
   
// Now checking whether user is already present or not .
    try{

        const founduser= await usermodel.findOne({
           email:email
        });

        if(founduser){
    
         throw new Error("user already exists , please signin ");

        }

     else{

const hashedpassword=await bcrypt.hash(password,4);

      await usermodel.create({

           name:name,
           email:email,
           password:hashedpassword,
           role:"user"
      });

      res.json({status:"signed up successfully"});




     }
    }catch(error){

       next(error);

     }

});


userRouter.post("/signin",async(req,res,next)=>{

try{

const email=req.body.email;
const password=req.body.password;

const checkuser= await usermodel.findOne({
    email:email,
});

   if(!checkuser)
   {
    res.json({Error:"please signup first"});
   }

  
// returns true/false 
  const result= bcrypt.compare(password,checkuser.password);

  if(!result){
   
    throw new Error("Invalid credentials ");
  }
  
  const usertoken=jwt.sign({id:checkuser._id.toString()},User_JWT_SECRET);

   res.header({usertoken:usertoken});
   res.json({Message:"signed In successfully "});



}catch(error){

  next(error);
}

});


userRouter.get("/events",async (req,res,next)=>{

    const events= await eventmodel.find({});
    console.log(events);  // it gives an array of documents i think    

});

userRouter.use((err,req,res,next)=>{

 res.json({Error_message:err.message});

});



module.exports={

  userRouter:userRouter

}