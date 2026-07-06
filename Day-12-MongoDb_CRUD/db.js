const mongoose=require("mongoose");   // requiring mongoose library 


const Schema=mongoose.Schema;            // mongoose provides a "class" named schema to write schema of data
const ObjectId=mongoose.ObjectId;     // objectId is a special type of id given by database automatically to document i.e every document in collection has its own unique id , denoted as _id 


// In collection we have user & todos data so we are describing the Schemas of both using schema class
  
const user= new Schema({        
    name:String,
    password:String,
    gmail:String

});

const todos=new Schema({
     description:String,
     status:Boolean,
     userId:ObjectId

});

// mongoose model is a high level function (means we dont have to worry about how my data will add in database , how it will delete , update  , this is the headache of this function not our ). So we are making a model which will do this task.
// model(,) takes 2 parameters first :- "collection name" , second :- schema of that collections data

const usermodel=mongoose.model("user",user);    
const todosmodel=mongoose.model("todos",todos);


module.exports={                      // exporting both models to our server file 
    usermodel:usermodel,
    todosmodel:todosmodel
}