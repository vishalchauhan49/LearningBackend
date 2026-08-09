const express= require("express");
const app = express();

const { userRouter } = require("./Routers/user");
const { adminRouter } = require("./Routers/admin");
const { eventRouter } = require("./Routers/events");
const mongoose= require("mongoose");


app.use(express.json());

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/events",eventRouter);

main();





async function main(){


const status= await mongoose.connect("mongodb+srv://vishalchauhan49:%40vishalgcet202428@hack.otjis3y.mongodb.net/college");

   if(!status){

 throw new Error("not connected ");

   }

  console.log(" success");
  app.listen(3003);


}



