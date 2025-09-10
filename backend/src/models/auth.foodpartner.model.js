import mongoose from "mongoose";
const foodpartschema=new mongoose.Schema({
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

const foodpartmodel=mongoose.model('foodpartmodel',foodpartschema);
export default foodpartmodel;