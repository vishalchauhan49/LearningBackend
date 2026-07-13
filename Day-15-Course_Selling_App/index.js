const express=require("express");
const app=express();
const mongoose=require("mongoose");
const { UserRouter }=require("./Routers/user");
const { courseRouter }=require("./Routers/course");
const { adminRouter } = require("./Routers/admin");

app.use(express.json());











//app.use("api/v1/user",userRouter) : Means if a request will come on this endpoint then it will be handled by UserRouter


app.use("/api/v1/user",UserRouter);    // for example we have version of our app (v1)
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);


 /* Suppose new version comes in market then u will not shut ur website donw na . For that u will do :-'

 // app.use("/api/v2/user",user2router)
 // app.use("/api/v2/course",course2router)
 // app.use("/api/v2/admin",admin2router)

By doing this ur app/website will run in production while developers can work upn their new version.


*/

 async function main(){

   await mongoose.connect("mongodb+srv://vishalchauhan49:%40vishalgcet202428@hack.otjis3y.mongodb.net/course_selling_App");
  
   app.listen(3000);
   console.log("at port 3000");
  
 }

 main();
