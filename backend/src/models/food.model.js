import mongoose from "mongoose";

const foodschema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true },
  foodpartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartmodel",
  },
  likeCount: { type: Number, default: 0 },
  saveCount: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const foodmodel = mongoose.model("foodmodel", foodschema);
export default foodmodel;
