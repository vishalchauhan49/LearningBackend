const express=require("express");
const courseRouter = express.Router();
const { coursemodel }=require("../db");
const { array, object } = require("zod");
const { _array } = require("zod/v4/core");
const { isValidObjectId } = require("mongoose");


courseRouter.get("/allcourses",async (req,res,next)=>{
        
    try {
      
  // Returns array containing  all courses 
  const data= await coursemodel.find({});
  console.log(data);
  
  // Remember in js type of array is " object "  
  // typeof() function returns simple object but u can hard check on it by using Array.isArray(parameter);
  if(typeof(data)=="object"){
      
   res.json({COURSES:data});
    
  }
  else{
    throw new Error("something went wrong");
  }
}catch(err){

next(err);

}
});

      

courseRouter.get("/preview",async (req,res,next)=>{

  try{
       
          const courseID= req.body.course;

 //Cheks whether courseId is valid objectId or not          
       if(!isValidObjectId(courseID))
          {
    
       return res.json({ERROR_MESSAGE:"Invalid course request"});

          }
            

  // Returns a particular course 
  // Eventuallly we will be serving an image on forntend soon .
    const particular_course= await coursemodel.findOne({_id:courseID});
  
     res.json({Viewing_course:particular_course});

        }catch(err){


       next(err);

        }
    
    
    });


courseRouter.use((err,req,res,next)=>{

  res.json({ERROR_MESSAGE:err.message});


});


module.exports = {
    courseRouter:courseRouter
}