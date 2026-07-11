const { Router }= require("express");
const adminRouter=Router();
const {z}=require("zod");
const bcrypt=require("bcrypt");
const { adminmodel } = require("../db");

const Admin_jwt_secret="adminsecret";   // admins secret 

async function authmiddleware(){

try{
      const admintoken=req.headers.admintoken;

        const verifiedData=jwt.verify(admintoken,Admin_jwt_secret);

            if(!verifiedData){

         throw new Error("Invalid credentials ");

             }

            else{

               next();

             }

  }catch(error){

     res.json({message:error.message});

    }
}


adminRouter.post("/signUp",(req,res)=>{

        const DesiredData=z.object({
        name:z.String(),
        email:z.String(),
        password:z.String().min(3).max(12)
       });

  const result=DesiredData.safeParse(req.body);
  
        if(!result.success){

    return res.json({message:result.error});
    console.log(result.error.message);
    

        }
   
          const name=req.body.name;
          const email=req.body.email;
          const password=req.body.password;



   const hashedpassword=bcrypt.hash(password,4);  // let salt rounds be 4 
     

      try {

    const isFound= await adminmodel.findOne({
            email:email,
       });

    if (isfound){

          throw new Error("User Already exists ,please signIn");
     }

    else {
    
        await adminmodel.create({
               name:name,
               email:email,
               password:hashedpassword
              
        });

     console.log("successfully created a Adminuser in database");
        

    }
    
      }catch(error){
   
          res.json({Error:error.message});
          console.log(error.message);
          

      }})



adminRouter.get("/courses",authmiddleware,(req,res)=>{

    res.send("Getting courses access of admin ")
});

adminRouter.post("/course",authmiddleware,(req,res)=>{

    res.send("creating course");
});

adminRouter.put("/course",authmiddleware,( req,res)=>{

    res.send("Updating a course");
});

adminRouter.delete("/course",authmiddleware,(req,res)=>{

    res.send("deletinga course ");
});

module.exports= {

    adminRouter:adminRouter


}