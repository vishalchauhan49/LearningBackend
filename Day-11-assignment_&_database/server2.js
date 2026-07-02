/* Biggest problem ::::

 In this when i am hitting the "/send" endpoint from the server then the server is returning me a html(sendfile.js) with live data embedded during request 
 but in my frontend its now getting "SHOWN" automatically
 bacause :-"FRONTEND IS NOT NAVIGATING TO that file which server is sending i.e sendfile.js"
so we have to manually navigate our frontend by some methods i.e DOM concepts 


And our server is giving a response so that response should we converted and navigated 
   const response=await......
    
   const html=response.text();

   douument.open();
   document.write(html);
   document.end();

       OR
document.body.innerHTML=html;





*/


const express=require("express");
const app=express();
const path=require("path");
const ejs=require("ejs");



app.use(express.json()); // to parse incoming body

app.set("view engine", ".ejs");
app.set("views",path.join(__dirname,"views"));


app.get("/",(req,res)=>{


const finalpath=path.join(__dirname,"index2.html");
res.sendFile(finalpath);


});


app.post("/send",(req,res)=>{

const username=req.body.username;
const password=req.body.password;

const data={username:username,password:password};


res.render('sendfile',{serveddata:data});


});

app.listen(3001);


















app.listen(3000);
