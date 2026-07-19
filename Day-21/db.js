const mongoos=require("mongoose");
const { string, email } = require("zod");
const { required } = require("zod/mini");
const schema= mongoose.schema;

const ObjectId=mongoose.ObjectId;




const user= new schema ({

  name:{type:string,require:true},
  emil:{type:email,require:true,unique:true},
  password:string,
  role:string

});

const admin= new schema ({

  name:{type:string,require:true},
  emil:{type:email,require:true,unique:true},
  password:string,
  role:string

});

const events= new schema ({
    
    title:string,
    Time:string,
    venue:string,
    description:string,
    createdby:ObjectId

});


const usermodel= mongoose.model("users",user);
const adminmodel= mongoose.model("admin",admin);
const eventmodel= mongoose.model("events",events);








module.exports={

 usermode,
 adminmodel,
 eventmodel


}