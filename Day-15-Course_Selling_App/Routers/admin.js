const { Router, response }= require("express");
const adminRouter=Router();
const {z}=require("zod");
const bcrypt=require("bcrypt");
const { adminmodel, coursemodel } = require("../db");
const jwt=require("jsonwebtoken");
const Admin_jwt_secret="adminsecret";   // admins secret 

async function authmiddleware(req,res,next){

try{
      const admintoken=req.headers.admintoken;

        const verifiedData=jwt.verify(admintoken,Admin_jwt_secret);

            if(!verifiedData){

         throw new Error("Invalid credentials ");

             }

            else{
             req.idcopied=verifiedData.id;
               next();

             }

  }catch(error){

     res.status(401).json({message:error.message});

    }
}


adminRouter.post("/signUp",async (req,res,next)=>{

        const DesiredData=z.object({              //required format for validating
        name:z.string(),
        email:z.string(),
        password:z.string().min(3).max(12)
       });

  const result=DesiredData.safeParse(req.body); // validating data using zod
  
        if(!result.success){

        console.log(result.error.message);
     return res.json({message:result.error.issues});
    

        }
 // providing data to the backend after validation succeeds 

         const { name , email ,password } = result.data;
     

  try{

         const isFound= await adminmodel.findOne({
                             email:email,
                        });

             if (isFound){

                throw new Error("User Already exists ,please signIn");
             }

            else {

         const hashedpassword=await bcrypt.hash(password,4);  // let salt rounds be 4 

                   await adminmodel.create({
                         name:name,
                         email:email,
                         password:hashedpassword
              
                   });

        //console.log("successfully created a Adminuser in database");
        res.status(200).json({Status:"Signed Up Successfully"});
        

    }
    
      }catch(error){
   
         
          //console.log(error.message);
          next(error);
          

      }})

adminRouter.post("/signin",async (req,res,next)=>{

   try {

           const email=req.body.email;
           const password=req.body.password;
    
           const checkadmin= await adminmodel.findOne({
            email:email
        });
              
        if(!checkadmin){
            throw new Error("Admin not found , please signUp");
        }
   
          const result=await bcrypt.compare(password,checkadmin.password);
         

                if(!result){
    
                   throw new Error("Invalid credentials of admin");
                }
    
           const admintoken=jwt.sign({id:checkadmin._id.toString()},Admin_jwt_secret); // Assigning jwt tokon to user
    
       // Despite sending a token as a response we are sending it into headers 
       
    
              res.header({admintoken:admintoken});
              res.json({message:"signed In successfully "})

      }catch(error){

               next(error);

      }


});


// Returning all courses of admin only 
adminRouter.get("/courses",authmiddleware,async (req,res ,next)=>{
      
   try{

            const adminId=req.idcopied;   // from middleware i got this 
           
            if(!adminId){  // or we can write (!isValidObjectId(adminId))  as well
            
      res.json({ERROR_MESSAGE:"Wrong admin request"});
            }

 // find function gives all the docuements with the required credenials and forEach is for traversing each document . Both are time taking process
            const arr=[];

            await (await coursemodel.find({creatorId:adminId})).forEach((course)=>{

   //  creating an array of objects containing courses title , price
            arr.push({title:course.title,price:course.price,role:course.role}); 
    });


// Returning course title and price for now . Eventually we will be adding full functionality into it.

              res.json({data:arr});
   
      }catch(error){
        
        
              next(error); // Returning error to error handler
           
   }
   });


// For creating a course    
adminRouter.post("/course",authmiddleware,async (req,res,next)=>{

   try{

       const title=req.body.title;
       const description=req.body.description;
       const price=req.body.price;
          
 
  
       const created_course_id= await coursemodel.create({
          title:title,
          description:description,
          price:price,
          creatorId:req.idcopied ,
          role:"admin"        // from middleware we are getting the id by modifing req object
        });

         console.log(created_course_id);
         
            res.header({id:(created_course_id._id)});     
            res.send(` TITLE:${created_course_id.title} 
                 DESCRIPTION:${created_course_id.description}
                 PRICE:${created_course_id.price}`);
      
      }catch(error){

            // console.log(error.message);
             next(error);
   
      }
    });


// For updating courses 
adminRouter.put("/course",authmiddleware,async ( req,res,next)=>{

   try {
          // asking an admin to give a course id to update it
          const courseId=req.body.id;
          const newtitle=req.body.title;
          const newdescription=req.body.description;
          const newprice=req.body.price;
   
  //Note :- changes want will be accepted from user bya req.body.    

          const result= await coursemodel.findOneAndUpdate(
                         {  _id:courseId },
                         { 
                            $set:{title:newtitle,description:newdescription,price:newprice}
                         },
                         {new:true}
                      );  

               console.log(result);
               res.json({UPDATED_DATA: result });

       }catch(error){

          next(error);
    } 
   });


//For deleting a course 
adminRouter.delete("/course",authmiddleware,async (req,res,next)=>{
    try{
      // Asking admin to provide the corse id to delete a course
    
         const courseid= req.body.id;
           
           if(!courseid)
           {
            throw new Error("Invalid course id ");
           }
      
         // You don't even need findOne first! Just try to delete it directly:
         const result = await coursemodel.deleteOne({ _id: courseid});

        // result looks like: { acknowledged: true, deletedCount: 1 }
            if (result.deletedCount > 0) 
               
               {
    
            return res.status(200).json({ message: "Course deleted successfully" });
               } 

          else {

            return res.status(404).json({ message: "Invalid course ID or course already deleted" });

              }
       }catch(error){

             next(error);

      }
});
   



adminRouter.use((error,req,res,next)=>{
    console.log(error.message);
    
  res.status(401).json({message:error.message});

})




module.exports= {

    adminRouter:adminRouter


}