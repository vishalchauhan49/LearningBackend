/* 
😅

I wrote a logic to solve that problem but I was shcked when I used " ERROR HANDLING "
Literally I gave 2 days on this but now it got solved just by simple error handling .
Suddenly I thought that let's apply some error handling into it and luckily it solved my whole problem. 

Now i understood that it was just a part of ERROR HANDLING nothing else complex .

*/  
  




const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "hello123JFWJFJDKJFK";

app.use(express.json());

const users = []; // A user array but soon we will be using dB 

app.post("/signup", (req, res) => {
           const username = req.body.username;
           const password = req.body.password;

  users.push({ username: username, password: password }); // eventually we will be using dB 

  res.json({ messsage: " Welcome ,You have succcessfully signedUp" });
});



app.post("/signin", (req, res) => {
            const username = req.body.username;
            const password = req.body.password;

  // before signing the user we are checking whether a valid pair of username and password exists or not in data .
  // Here i am not using error handling concepts because i have not yet masterd it.

  const found = users.find(
         (u) => u.username === username && u.password === password);

          if (!found)

          return res.status(401).json({ message: "Please SignUp first" });

          const token = jwt.sign({ username: username }, JWT_SECRET);         // assigning a jwt token 
          
           
       //   console.log(users);                           
          res.json({ token: token });
       // console.log(token);
});

const authMiddleware = (req, res, next) => {


    try{

      const token = req.headers.authorization;
      const Info = jwt.verify(token, JWT_SECRET);

      const length = users.length;

           for (let i = 0; i < length; i++) {
             if (Info.username === users[i].username) 
                {
                    
                       req.copyData = Info;
                    
                   console.log(" token was issued , u can access '/me' endpoint ");
            return next();

        } 
    }
  } catch(error){
           
            return res.status(403).json({message:"Please Sign In First "});
            //console.log("please signIn first to access '/me' endpoint  ");
    }


              }
           

  



app.get("/me", authMiddleware, (req, res) => {
  
           
          res.send(`${req.copyData.username}`);
          console.log(`${req.copyData.username}`);
});


app.listen(3000, () => {
  console.log("working great on port 3000");
});
