const mongoose=require("mongoose");
const { email, string } = require("zod");
const course = require("./Routers/course");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;



const users= new Schema({
  name:string,
  email:{type:string,unique:true},
  password:string,

});

const courses=new Schema({
 title:string,
 description:string,
 price:Number,
 creatorId:ObjectId

})

const admin =new Schema({
    name:string,
    email:{type:string,unique:true},
    password:string,
    
})

const purchases= new Schema({
  userId:ObjectId,
  courseId:ObjectId
})


const usermodel = mongoose.model("users",users);
const coursemodel = mongoose.model("courses",courses);
const adminmodel = mongoose.model("admin",admin);
const purchasemodel = mongoose.model("purchases",purchases);

module.exports={
  usermodel:usermodel,
  coursemodel:coursemodel,
  adminmodel:adminmodel, 
  purchasemodel:purchasemodel

}