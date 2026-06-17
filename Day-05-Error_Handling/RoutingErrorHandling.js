/*

      ROUTE BASED ERROR HANDLING ( no try/catch)

📌 EVERY route in express is internally a middleware .So if error can come add next() else dont .

📌 next("anything") ➡️ Treated as error means , it tell express hey something bad happened and it gave error thus error handler catches it.

📌 const err=new Error("message u wanna send");
     err is an object so fundamental knowledge of error is applied.

 ⬆️ above line can we also writtne inside next():-     next(new Error("message")) OR next(err)


*/

// we can get rid of return next(err)===> By just modifing our if loop . 
// we know that return is written when more lines of code is not to be exeuted after next();
// so we will write such cide that our next() function will come to last of code execution .
// Just a writing style nothing else:
/*

    const user = null;

    if(user){
            res.json(user);
             console.log(user);
            }
    else {
    const err=new Error("ERROR");   

     next(err);  



*/

const express = require("express");
const app = express();
app.use(express.json());

app.get("/user", (req, res, next) => {
  const user = null;

  if (!user) {
    const err=new Error("user not found");   

    return next(err);  // manually send error 
                      // Now control will be forwarded to error handler at bottom
  } 

  res.json(user);
  console.log(user);
  
});



// error handler at bottom catches all error
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message});
  console.log(err);
  

});

app.listen(3000);