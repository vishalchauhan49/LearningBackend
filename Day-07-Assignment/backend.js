const express=require("express");
const app=express();

const jwt_secret="hello123";
const jwt=require("jsonwebtoken");
const path=require("path");
const fs=require("fs");


app.use(express.json());






const users=[];






app.get("/",(req,res)=>{

const finalpath=path.join(__dirname,"assignment.html");
res.sendFile(finalpath);


});

app.post("/signup",(req,res)=>{



const username=req.body.username;
const password=req.body.password;

users.push({username:username,password:password});
res.json({message:"u are signedUp"});


});







































































































app.listen(3000);