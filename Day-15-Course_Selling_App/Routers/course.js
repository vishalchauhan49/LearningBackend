const { Router }=require("express") // another way to use router 
const courseRouter = Router();



courseRouter.get("/allcourses",(req,res)=>{
    res.send("Sending all courses ");
})

courseRouter.get("/preview",(req,res)=>{

    res.send("Detials of a particular course")
})


module.exports = {
    courseRouter:courseRouter
}