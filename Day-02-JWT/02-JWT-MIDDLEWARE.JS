/*. 
In middleware i wrote 

   req.copyData=Info;   

  abve " req "" is a js object and we are simply adding a key named copyData in an object having value = Info
  IN MIDDLEWARE we know that middleware can modify req and res object of a route so we had done the same . 
  all the modifications in middleware's req and res obj gets reflected when user goes to a main endpoint i.e /me 
    
  */

/* next() is a callback function ,

   return next() , says that hey express go to the next route .ie /me and immediately stop further execution of the middleware . IF u will write only next() then as i told earlier that next() is a middleware it will "PAUSE" the execution and will execute "/me" endpoint and after finishing it will again resume the execution of middleware hence the line i.e "please sign in " will get printed despite of signed user.


   I above scenerio error will come ( Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client.)
   Means :  server is attempting to send two different HTTP responses to Postman for a single request. 
   
   
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

          const token = jwt.sign({ username: username }, JWT_SECRET);

           

  res.json({ token: token });
  console.log(token);
});

const authMiddleware = (req, res, next) => {
      const token = req.headers.authorization;
      const Info = jwt.verify(token, JWT_SECRET);

      const length = users.length;

           for (let i = 0; i < length; i++) {
             if (Info.username === users[i].username) {
               req.copyData = Info;
                    return next();
              }
           }

  return res.json({ message: "please sign in first" });
};

app.get("/me", authMiddleware, (req, res) => {
  


          res.send(`${req.copyData.username}`);
          console.log(`${req.copyData.username}`);
});


app.listen(3000, () => {
  console.log("working great on port 3000");
});
