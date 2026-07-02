//. Browser sends a POST request.( FORM )
// Server responds.
// If the response is HTML (for example, from res.render()), the browser automatically displays that page. WE DONT have to navigate to that file manually .

// To use ejs file we use res.render({".ejs file name",{OBJ : "STORE ALL POST DATA INTO IT"}}),

// now this obj will treat lik a variable and in .ejs file we will get value from this object itlself.


const express=require("express");
const app=express();
const Path=require("path")
const ejs=require("ejs");


app.use(express.urlencoded({ extended: true })); // parsing the form data from frontend


app.set("view engine",".ejs");      // we are assigning a setting i.e how    express should treat a file i.e whether a common js or .ejs

app.set("views",Path.join(__dirname,"views")); // joining the views folder to the current directory


app.get("/",(req,res)=>{


const finalpath=Path.join(__dirname,"index1.html");
res.sendFile(finalpath);


});

app.post("/send",(req,res)=>{

const username=req.body.username;
const password=req.body.password;

const data={username:username,password:password};

res.render('sendfile',{serveddata:data});  // sending the data to the sendfile.ejs by embedding it into a variable named serveddata 

});


app.listen(3000);







