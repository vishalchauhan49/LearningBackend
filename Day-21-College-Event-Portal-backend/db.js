const mongoose=require("mongoose");
const { string, email } = require("zod");
const { required } = require("zod/mini");
const Schema= mongoose.Schema;

const ObjectId=mongoose.ObjectId;




const user= new Schema ({

  name:{type:string, require:true},
  email:{type:string , unique:true},
  password:string,
  role:string

});

const admin= new Schema ({

  name:{type:string,require:true},
  email:{type:string, unique:true ,require:true},
  password:string,
  role:string

});

const events= new Schema ({
    
    title:string,
    time:string,
    venue:string,
    description:string,
    createdby:ObjectId

});


const usermodel= mongoose.model("users",user);
const adminmodel= mongoose.model("admin",admin);
const eventmodel= mongoose.model("events",events);








module.exports={

 usermodel,
 adminmodel,
 eventmodel


}