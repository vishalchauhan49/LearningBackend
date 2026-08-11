const express=require("express");
const app=express();
const multer=require("multer");
//const upload=multer({dest:'/Users/vishalchauhan/Desktop'});
const upload = multer({ dest: 'uploads/' });
//const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });

const path=require("path");
const fs=require("fs").promises;

app.use("uploads",express.static("uploads"));
app.get("/main",async(req,res)=>{

const finalpath=path.join(__dirname,"index.html");
const data=await fs.readFile(finalpath,'utf-8');
res.send(data);

})
app.post("/profile",upload.single('example'),(req,res)=>{

   
console.log(req.file);
res.send(req.file);


})






app.listen(3000);