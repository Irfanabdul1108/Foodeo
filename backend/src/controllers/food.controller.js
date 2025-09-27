import foodpartmodel from "../models/auth.foodpartner.model.js";
import foodmodel from "../models/food.model.js";
import likemodel from "../models/likes.model.js";
import fileupload from "../services/foodstorage.service.js";
import savemodel from "../models/savefood.model.js";
import { v4 as uuid } from 'uuid'
async function createFood(req, res) {
    const fileuploadres = await fileupload(req.file.buffer, uuid())
    const fooditem = await foodmodel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileuploadres.url,
        foodpartner: req.foodpartner._id
    })
    res.json({ message: 'Food item created successfully', fooditem })

}

async function getfooditems(req, res) {
  const fooditems=await foodmodel.find({})
  res.json({message:'fooditems fetched successfully',fooditems})
}

async function foodpartnerbyid(req, res) {
    try {
      const foodpartnerid = req.params.id;
      if (!foodpartnerid) {
        return res.json({ message: "Food partner ID is required" });
      }
      const foodpartnerprofile = await foodpartmodel
        .findById(foodpartnerid)
        .select("-password");
  
      if (!foodpartnerprofile) {
        return res.json({ message: "Food partner profile not found" });
      }
      const fooditemsbyfoodpartner = await foodmodel.find({ foodpartner: foodpartnerid });
      return res.json({
        message: "Food partner profile fetched successfully",
        foodpartnerprofile,
        fooditemsbyfoodpartner,
      });
    } catch (error) {
      console.error("Error fetching food partner profile:", error);
      return res.json({ message: "Internal Server Error" });
    }
  }
async function likefoodcontroller(req, res) {
  try {
    const { foodid } = req.body;
    const userId = req.user?._id;

    if (!foodid) {
      return res.status(400).json({ 
        success: false, 
        message: "foodid is required" 
      });
    }
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized: Please login to like" 
      });
    }

    const existing = await likemodel.findOne({ user: userId, food: foodid });

    if (existing) {
      await likemodel.deleteOne({ user: userId, food: foodid });
      await foodmodel.findByIdAndUpdate(foodid, { $inc: { likeCount: -1 } });

      const food = await foodmodel.findById(foodid);
      return res.status(200).json({
        success: true,
        liked: false,
        likeCount: food?.likeCount || 0,
        message: "Food unliked successfully",
      });
    }

    await likemodel.create({ user: userId, food: foodid });
    await foodmodel.findByIdAndUpdate(foodid, { $inc: { likeCount: 1 } });

    const food = await foodmodel.findById(foodid);
    res.status(200).json({
      success: true,
      liked: true,
      likeCount: food?.likeCount || 0,
      message: "Food liked successfully",
    });
  } catch (err) {
    console.error("❌ Error in likefoodcontroller:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: err.message 
    });
  }
}

async function savefoodcontroller(req, res) {
  try {
    const { foodid } = req.body;
    const userId = req.user?._id;

    if (!foodid) {
      return res.status(400).json({ 
        success: false, 
        message: "foodid is required" 
      });
    }
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized: Please login to save" 
      });
    }

    const existing = await savemodel.findOne({ user: userId, food: foodid });

    if (existing) {
      await savemodel.deleteOne({ user: userId, food: foodid });
      await foodmodel.findByIdAndUpdate(foodid, { $inc: { saveCount: -1 } });

      const food = await foodmodel.findById(foodid);
      return res.status(200).json({
        success: true,
        saved: false,
        saveCount: food?.saveCount || 0,
        message: "Food unsaved successfully",
      });
    }

    await savemodel.create({ user: userId, food: foodid });
    await foodmodel.findByIdAndUpdate(foodid, { $inc: { saveCount: 1 } });

    const food = await foodmodel.findById(foodid);
    res.status(200).json({
      success: true,
      saved: true,
      saveCount: food?.saveCount || 0,
      message: "Food saved successfully",
    });
  } catch (err) {
    console.error("❌ Error in savefoodcontroller:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: err.message 
    });
  }
}

async function getSavedIds(req, res) {
  try {
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized: Please login" 
      });
    }

    const saves = await savemodel.find({ user: userId }).select('food');
    const savedIds = saves.map(s => s.food);
    
    res.status(200).json({ 
      success: true, 
      savedIds 
    });
  } catch (err) {
    console.error("Error in getSavedIds:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: err.message 
    });
  }
}

export {
    createFood,
    getfooditems,
    foodpartnerbyid,
    likefoodcontroller,
    savefoodcontroller,
    getSavedIds
};