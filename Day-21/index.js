const express= require("express");
const app = express();

const { userRouter,adminRouter,eventRouter}=require("./Routers");
const mongoose= require("mongoose");


app.use(express.json());

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/events",eventRouter);





async function main(){


mongoose.connect("");




}



app.listen(3000,()=>{console.log("working at port 3000")});