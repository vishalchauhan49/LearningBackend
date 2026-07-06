/* 


=> In db we are describing the schema & models  of our database . 
=> Schema means how my data will look in database , what type of value it will take .
=> For now , Models are just high level functions by which we manuipulats our database.
=> Data is stored in doucments in mongoDB .
=> "mongoose" library is used to make a connection between express application and databse.
=> We use import and exports methods to link our both files (db , server ).
=> We can write all the login in one file i.e  "server.js" but we don't do that because of CLEAN & READABLE code(A industry practised nothing else) 

NOTE:- after cluster url , user have to add its database name 

FOR EXAMPLE ,In below code ==>>> todo-application is the database name 

           
 */




const express=require("express");
const app=express();
const {usermodel,todosmodel}=require("./db"); // requiring both models from db.js file
const jwt=require("jsonwebtoken");
const { name } = require("ejs");
const JWT_secret="hello123";
const mongoose=require("mongoose");  


mongoose.connect("mongodb+srv://vishalchauhan49:%40vishalgcet202428@hack.i0sfj3w.mongodb.net/todo-application");



app.use(express.json());  //  parsing the request body

app.post("/signup",async (req,res)=>{

// NOTE : For now we are not checking whether user exists in database or not .
// Eventually I will be appling restrictions on username , email etc i.e they should be unique


try {
    const name=req.body.username;        // getting username,password , email from user 
    const password=req.body.password;
    const gmail=req.body.gmail;

  await usermodel.create({   // Adding  data's into user collection(database) using usermodel
        name:name ,
        password:password,
        gmail:gmail
    });

           res.send("successfully sigend up ");
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
            password:password
           });

      if(!founduser)
      {
         throw new Error(" Cannot access data");    
      }

    
// creating a jwt token using data's id  "(special key ( _id ) automatically given by database while creating a data )" 
     const token=jwt.sign({id:founduser._id},JWT_secret);  
        
// before i was storing this token i localstorage but eventually i will be storing it in httpOnly-cookies for tha sake of security .

        res.json({token:token});
        console.log("done signUP");
          
  }catch(error){

       res.json({message:`${error.message}`});
        console.log(error.message);

  }});

// Hitting database on. iddleware is not a good practise , auth middleware should only be for authrntication . IF user is valid then it should pass control to the route and inside route handler u should hit the database . FOR EXAMOPLE , IN THIS MIDDLEWARE I AM HITTING THE DATABASE FOF CREATING THE TODO AFTER CHECKING USER VALIDATION BUT I SHOULDN'T DO THAT . 
// Because middleware is for authentication not for every use .

 async function authMiddleware(req,res,next){
    
 try{

       const token=req.headers.token;     // requesting the frontend to send token in headers 
       const verifiedata=jwt.verify(token, JWT_secret);      // verifing it using that token


// NOTE : IN JWT we said that for authentication we don't have to hit database but for further information stored in database we have to hit the database like courses , profile etc. So same after authentication we will hit the database for the further details of the user .           
         
           if(!verifiedata)
           {

              throw new Error("USER NOT FOUND PLEASE LOGIN ");

           }

      
  const userToget = await usermodel.findOne({     // These lines of code are for  further details of user
                   _id:verifiedata.id
               });

            console.log(userToget);
            console.log(verifiedata);
            

// modified request object of middleware and now this modification will be copied to the route and i can go what i wish .
      
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
     const getTodo_of_user = await todosmodel.findOne({    
                   userId:getData.id
               });

          res.json({Your_Todos_Are:`${getTodo_of_user.description}`});
            console.log(specific_id);
            
 

});

app.use((error,req,res,next)=>{

    res.status(404).json({message:`${error.message}`});


})



app.listen(3000);
