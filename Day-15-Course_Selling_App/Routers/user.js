const express=require("express");
const UserRouter=express.Router() ;
const jwt=require("jsonwebtoken");
const { usermodel, purchasemodel ,coursemodel} = require("../db");
const { z, check }=require("zod");
const bcrypt=require("bcrypt");
const { $ZodCheckLowerCase } = require("zod/v4/core");
const cookieParser = require("cookie-parser");
const { ParseStatus } = require("zod/v3");
const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");
//const course = require("./course");


const users_jwt_secret="userssecret";  // users jwt secret 

async function authmiddleware(req,res,next){

try{

         const usertoken=req.headers.usertoken;

         const verifiedData=jwt.verify(usertoken,users_jwt_secret);

            if(!verifiedData){

              throw new Error("Invalid credentials ");
             }
        req.idcopied=verifiedData.id;
             next();


    }catch(error){

  next(error.message);

    }
}

UserRouter.post("/signup",async (req,res,next)=>{

  // Validating users input using zod   
    const DesiredData=z.object({
        name:z.string(),
        email:z.string(),
        password:z.string()
         });

    const result=DesiredData.safeParse(req.body);

       if(!result.success){
// wrote return res,json() becuase without return it will execute further code , we havent used try catch that's we have to manually stop the further execution
          console.log(result.error.issues);
         return res.json({message:result.error.issues});   // returning error if validation fails 
         
         
       }
    

      // Here i am haing a confusion that whether should i do const name=req.body.result.data.name ; ????
// GOT answer :- Yes u should write this to get data . Because in runtime execution zod will validate data now it is 100 % sure that data is in the same desired format and also present .

  
  const { name,email,password }= result.data;
   
   
      try {

    const isFound= await usermodel.findOne({
            email:email,
       });

    if (isFound){

          throw new Error("User Already exists ,please signIn");
     }

    else {
    const hashedpassword= await bcrypt.hash(password,4);  // let salt rounds be 4 
        await usermodel.create({
               name:name,
               email:email,
               password:hashedpassword
              
        });

     console.log("successfully created a user in database");
        

    }
    
      }catch(error){
   
         
          console.log(error.message);
          next(error);
          

      }





});

UserRouter.post("/signin",async (req,res,next)=>{
   try{
 
           const email=req.body.email;
           const password=req.body.password;

           const checkuser= await usermodel.findOne({
                      email:email
            });
      
    
               if(!checkuser){

                    res.json({message:"please sign Up first "});

               }
              
                 
           const result=bcrypt.compare(password,checkuser.password);
     
                if(!result)
              {
                  throw new Error("Wrong password , please enter right password  ");
              }

           const usertoken=jwt.sign({id:checkuser._id.toString()},users_jwt_secret); // Assigning jwt tokon to user

   // Despite sending a token as a response we are sending it into headers 
   

              res.header({usertoken:usertoken});
              res.json({message:"Y are signedIn"});

      }catch(error){
          next(error);
      }

});


// Route to purchase a course , And displaying purchased course title & price 
UserRouter.post("/course",authmiddleware,async (req,res,next)=>{
    
  try{
         const userId=req.idcopied;
// Accepting a course id to purchase a course but eventually we will be using a real time illustration .
      const courseid=req.body.course;
      console.log(courseid);
    
 // isvlaideObjetId returns true / false      
         if(!(isValidObjectId(courseid))){
           throw new Error("ID IS NOT CORRECT");
         }
       
        
  //Extracting purchased course's title & price       
         const coursedetails=await coursemodel.findOne({_id:courseid});
                if(!coursedetails){

                  return res.json({Error_message:"Something went wrong"});
                }
         
        
         const purchasedcourse=await purchasemodel.create({
                     userId:userId,
                     courseId:courseid,
                     coursetitle:`${coursedetails.title}`,
                     courseprice:`${coursedetails.price}`
       });
           //console.log(purchasedcourse);
 
       res.json({DETAILS:`COURSE: ${purchasedcourse.coursetitle}   PRICE:  ${purchasedcourse.courseprice} `});
               
      }catch(err){

        next(err);
        console.log(err);
        
      }

 });

UserRouter.get("/purchases",authmiddleware,async (req,res,next)=>{
     
  try{
           const arr=[];
           const userid=req.idcopied;
         
           
      await (await purchasemodel.find({userId:userid})).forEach((data)=>{

           arr.push(data);
           console.log(data);
           console.log(arr);
           
           

       });

       

    
     res.json({COURSES_ARE: arr });
     
      }catch(err){
   console.log(err);
   
   next(err);



      }
  
  

});


UserRouter.use((err,req,res,next)=>{

  res.status(401).json({message:`${err}`});
  console.log(err.message);
  
  
  



})

module.exports={

    UserRouter:UserRouter
    
}