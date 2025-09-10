import mongoose from "mongoose";

const likeschema=new mongoose.Schema({
    user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'usermodel',
  required:true
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'foodmodel',
        required:true
    }
},{
    timestamps:true
})

const likemodel=mongoose.model('likemodel',likeschema);
export default likemodel;