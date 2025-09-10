import mongoose from "mongoose";

const foodsaveschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel",
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodmodel",
    required: true
  }
}, {
  timestamps: true
});

foodsaveschema.index({ user: 1, food: 1 }, { unique: true });

const savemodel = mongoose.model('savemodel', foodsaveschema);
export default savemodel;
