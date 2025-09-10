import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
    type:String,
    required:true
    }
},{
    timestamps:true
})

const usermodel=mongoose.model('usermodel',userschema);
export default usermodel;