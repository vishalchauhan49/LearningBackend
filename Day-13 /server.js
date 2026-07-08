
const express=require("express");
const app=express();
const {usermodel,todosmodel}=require("./db"); 
const jwt=require("jsonwebtoken");
const { name } = require("ejs");
const JWT_secret="hello123";
const mongoose=require("mongoose");  
const bcrypt =require("bcrypt");



mongoose.connect("");



app.use(express.json()); 

app.post("/signup",async (req,res)=>{



try {
    const name=req.body.username;        
    const password=req.body.password;
    const gmail=req.body.gmail;
    
    const hashedpassword= await bcrypt.hash(password,4);    // let salt rounds be 4 

  await usermodel.create({  
        name:name ,
        password:hashedpassword,
        gmail:gmail
    });

           res.send(hashedpassword);
           console.log("done");

    }catch(err){

      res.json({error:err.message});
      console.log("Error occured");

    }

});


app.post("/signin",async (req,res)=>{

  try {

       const email=req.body.email;       // taking email & password from user as input 
       const password=req.body.password;
  

    const founduser= await usermodel.findOne({     // finding the user with these credentials
            email:email,
        
           });

    const signIn_time_password=founduser.password;  // Accessing hashed password back from database  
     
   const result= await bcrypt.compare(password,signIn_time_password); // Getting hashed password and comparing it with password given by user this time for signing In .



      if(!result==true)
      {
         throw new Error(" Cannot access data");    
      }

    

     const token=jwt.sign({id:founduser._id},JWT_secret);  
        

        res.json({token:token});
        console.log("done signUP");
          
  }catch(error){

       res.json({message:`${error.message}`});
        console.log(error.message);

  }});


 async function authMiddleware(req,res,next){
    
 try{

       const token=req.headers.token;     
       const verifiedata=jwt.verify(token, JWT_secret);      // verifing it using that token


            
         
           if(!verifiedata)
           {

              throw new Error("USER NOT FOUND PLEASE LOGIN ");

           }

      
  const userToget = await usermodel.findOne({     
                   _id:verifiedata.id
               });

            console.log(userToget);
            console.log(verifiedata);
            


      
    req.copieddata={username:userToget.name,id:userToget._id}; 

     next(); // we can write here return next() but this is the end line so we haven't.
       
     }catch(error){
          
         res.json({message:`${error.message}`});
         console.log(error.message);
          next(error); // passing the control to error handler ( A industry practise ) else u can send error as usual

        }
      }



 
app.post("/todo",authMiddleware,async (req,res)=>{
   
       const getCopiedData= req.copieddata; // Accessing copieddata from middleware
       


       const description=req.body.description;   // Taking inputs for todo
       const progress=req.body.progress;
    
       const todo= await todosmodel.create({      // creating todo 
          description:description,
          progress:progress,
          userId:getCopiedData.id
                 
        });
   
          
        res.json({username:getCopiedData.username,TODO:todo });
        console.log(todo.description);
            
     


});


// Findindg the todos of a particular user.
// For now this route shows todos of login user (recently login ).
// WE can ask for a specific id to get todos of that particular user.
app.get("/todos",authMiddleware,async (req,res)=>{
   
 // middleware has access to req & res objects  then it doesn't means that u can't make requests from route handler  , You can make requests from both (In headers , body etc )

  const specific_id=req.body.id;

   const getData= req.copieddata;

     const getTodo_of_user = await todosmodel.findOne({     // finding the user with specific id  
                   userId:getData.id
               });

      //          OR 
     // todosmodel.findById(getData.id)     // finding the user with specific id     

          res.json({Your_Todos_Are:`${getTodo_of_user.description}`});
            console.log(specific_id);
            
 

});

app.use((error,req,res,next)=>{

    res.status(404).json({message:`${error.message}`});


})



app.listen(3000);
