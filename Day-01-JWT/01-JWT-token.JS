// This is the illustration of 'SIMPLE" jwt verification using code .
// Here otp , gmail verification is not used because its just a basic jwt llustration. 


/* 

"/signup", "/signin" , "/me" :-  THESE ARE 3 ENDPOINTS MADE
jwt.sign() function takes a jwt secret key and a payload as a paramenter and after that , digitally signs users details given bya user and make a specific signature . 
 in one workd it converts users data into a token whereas previously tokens was just a random generated string .
 
 */



// jwt.verify() function takes that same jwt secret key as paramenter and the token( jwt token ) ,thus decodes its information which was previously given by user at tha time of token creation . And matches the expected signature with the previous generated signature if it matches the authentication gets done else not .  




// NOTE : HERE WE ARE NOT CHECKING WHETHER A PAIR OF USERNAME AND PASSWORD IS PRESENT OR NOT BEFORE SIGNING AND ALL .



const express=require("express");          // requiring express 

const jwt =require("jsonwebtoken");          // using jsonwebtoken library 

const app =express();                       // instance of express library 

const JWT_SECRET="vishal_chauhan ";            // providing a secret key for digital signature  

app.use(express.json());

const user=[];      // an array of users , in few days we will be using database. 




app.post("/signup",(req,res)=>{                                      

          const username=req.body.username;
          const password=req.body.password;


            user.push({username:username,password:password});
            res.json({message:"signUp endpoint is working properly"});


                          });



    // IN "signin" WE ARE NOT CHECKING WHETHER USER EXISTS OR, WE CAN CHECK BUT I AM NOT CHECKING.
    // SO DON'T THINK THAT THIS IS A BUG THIS IS EXPLICITALY CODED BY ME , 
    // IN "/me" CODE IS INTENTIONALLY WRITTEN IGNORING THE EXISTANCE OF USER OR ALL OTHER BUG U ARE ASSUMING . 

app.post("/signin",(req,res)=>{

          const username=req.body.username;
          const password=req.body.password;

              const token=jwt.sign({username:username},JWT_SECRET);

              return res.json({token:token});

                          });


app.get("/me",(req,res)=>{


           const token=req.headers.authorization;
  
           const userdetails=jwt.verify(token,JWT_SECRET);

                 res.send( userdetails.username);



                         });

app.listen(3000,()=>{console.log("at 3000");


});

