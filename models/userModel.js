import mongoose from "mongoose";

const Schema = mongoose.Schema;

//User Model
const UserSchema=new Schema({
firstName:{
type:String,
required:true
},
lastName:{
    type:String,
    required:true
},
email:{
type:String,
required:true
},
password:{
type:String,
required:true
},
image:{
    type:String,
    required:false
},
role:{
    type:String,
    required:true,
    enum:['user','admin']
}

})

export default mongoose.model("User", UserSchema);
