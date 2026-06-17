 /*
 
 
 📌 We simply use try/catch fundamental concepts nothing else.
 
 📌 In try catch :- WE put our risky code inside try block and if error comes then catch blocks catches it .Hense after that we log it or whatsever .
 📌In express middleware we pass our error to ERROR HANDLER using next() thats it .
 
 
 
 
 */




const express = require("express");
const app = express();
app.use(express.json());

app.get("/user", (req, res, next) => {
  try {
    const user = null;


    if(user)
    {
res.json(user);
console.log(user);

    }

    else{

      throw new Error("User not found"); // throw inside try

    }} catch (err) {

    next(err); // catch grabs it, passes to error handler.

 //💀 NOTE : WE CAN WRITE return next(err ) but not written because this was our last line of execution.      




    // infact we can write here that 
    // res.json({message:"user not found "}) but its not a good conduct because we are using a error handler then let him do his job na . 
    // Error response me hi send krna tha to direct bhejdo na kya faida hai error handling ka phir.
  }
});



// error handler at bottom catches it
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);