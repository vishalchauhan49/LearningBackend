const express=require("express");
const app=express();
const {usermodel,todosmodel}=require("./db");
const jwt=require("jsonwebtoken");
const { name } = require("ejs");
const JWT_secret="hello123";
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");

mongoose.connect("mongodb+srv://vishalchauhan49:%40vishalgcet202428@hack.i0sfj3w.mongodb.net/todo-application");



app.use(cookieParser());
app.use(express.json());

app.post("/signup",async (req,res)=>{

    try {
           const name=req.body.username;
           const password=req.body.password;
           const gmail=req.body.gmail;

        await usermodel.create({name:name ,password:password,gmail:gmail});

           res.send("successfully sigend up ");
           console.log("done");

    }catch(err){

      res.json(err.message);
      console.log("error occured");
   

    }



})


app.post("/signin",async (req,res)=>{

  try {

       const email=req.body.email;
       const password=req.body.password;
  


       const founduser= await usermodel.findOne({
            email:email,
            password:password
           });

      if(!founduser)
      {

     throw new Error(" cant access data");

      }

     const token=jwt.sign({id:founduser._id},JWT_secret);

        // res.cookie("dekhle",token,
        //     {
        //     httpOnly:true,
        //     secure:true,
        
        
        
        // });
       

       res.json({token:token});
        console.log("done signUP");
          
 }catch(error){

res.send(error.message);
console.log("Warning error");


 }});


app.post("/todo",async (req,res)=>{
     
    try{

            const token=req.headers.token;
           
             const verifiedata=jwt.verify(token, JWT_secret);


// NOTe : IN JWT we said that for authentication we don't have to hit database but for further information stored in database we have to hit the database like courses , profile etc.             
         
            const gotuser = await usermodel.findOne({
                                _id:verifiedata.id
                             });
            console.log(gotuser);
            console.log(verifiedata);
            
            

           if(!verifiedata)
           {
              throw new Error("USER NOT FOUND PLEASE LOGIN ");
           }

const description=req.body.description  // getting todo from user 
const progress=req.body.progress;       // getting todo progress form user 



        const todos=await todosmodel.create({
               description:description,
               progress:progress,
               userId:verifiedata.id

});
      console.log(todos);
      res.send(` welcome ${gotuser.name} (${verifiedata.id}) & ${todos.description}`);


       
     }catch(error){

         res.send(error.message);
         console.log(error.message);
    

        }
         


});


app.get("todos",(req,res)=>{


})




app.listen(3001);
