const express=require("express");
const UserRouter=express.Router() ;
const jwt=require("jsonwebtoken");
const { usermodel } = require("../db");
const {Z}=require("zod");
const bcrypt=require("bcrypt");

const users_jwt_secret="userssecret";  // users jwt secret 

async function authmiddleware(){

try{

         const usertoken=req.headers.usertoken;

         const verifiedData=jwt.verify(usertoken,users_jwt_secret);

            if(!verifiedData){

              throw new Error("Invalid credentials ");
             }
       
             next();


    }catch(error){

  res.json({message:error.message});

    }
}

UserRouter.post("/signup",async (eq,res)=>{

  // Validating users input using zod   
    const DesiredData=z.object({
        name:z.String(),
        email:z.String(),
        password:z.String().min(3).max(12)
       });


    const result=DesiredData.safeParse(req.body);

       if(!result.success){
// wrote return res,json() becuase without return it will execute further code , we havent used try catch that's we have to manually stop the further execution
         return res.json({message:result.error});   // returning error if validation fails 
         console.log(result.error.message);
         
       }
    
      // Here i am haing a confusion that whether should i do const name=req.body.result.data.name ; ????
  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password;
  
   
   const hashedpassword=bcrypt.hash(password,4);  // let salt rounds be 4 
     

      try {

    const isFound= await usermodel.findOne({
            email:email,
       });

    if (isfound){

          throw new Error("User Already exists ,please signIn");
     }

    else {
    
        await usermodel.create({
               name:name,
               email:email,
               password:hashedpassword
              
        });

     console.log("successfully created a user in database");
        

    }
    
      }catch(error){
   
          res.json({Error:error.message});
          console.log(error.message);
          

      }





});

UserRouter.post("/signin",(req,res)=>{res.json({message:"signed In"})});

UserRouter.get("/purchases",authmiddleware,(req,res)=>{res.send("all courses")});




module.exports={

    UserRouter:UserRouter
    
}