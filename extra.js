/*

      ROUTE BASED ERROR HANDLING ( no try/catch)

📌 EVERY route in express is internally a middleware .So if error can come add next() else dont .

📌 next("anything") ➡️ Treated as error means , it tell express hey something bad happened and it gave error thus error handler catches it.

📌 const err=new Error("message u wanna send");
     err is an object so fundamental knowledge of error is applied.

 ⬆️ above line can we also writtne inside next():-     next(new Error("message")) OR next(err)


*/

const express = require("express");
const app = express();
app.use(express.json());

app.get("/user", (req, res, next) => {
  const user = null;

    if(user){
            res.json(user);
  console.log(user);
    }

else  {
    const err=new Error("ERROR");   

     next(err);  // manually send error 
                      // Now control will be forwarded to error handler at bottom
  } 

 
  
});



// error handler at bottom catches all error
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message});
  console.log(err);
  

});

app.listen(3000);