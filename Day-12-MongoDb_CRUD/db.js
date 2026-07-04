const mongoose=require("mongoose");
// const { useEffect } = require("react");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;


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

const usermodel=mongoose.model("user",user);
const todosmodel=mongoose.model("todos",todos);


module.exports={
    usermodel:usermodel,
    todosmodel:todosmodel
}