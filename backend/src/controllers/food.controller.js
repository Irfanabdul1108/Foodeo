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
      return res.json({ message: "foodid is required" });
    }
    if (!userId) {
      return res.json({ message: "Unauthorized: user missing" });
    }

    const existing = await likemodel.findOne({ user: userId, food: foodid });

    if (existing) {
      await likemodel.deleteOne({ user: userId, food: foodid });
      await foodmodel.findByIdAndUpdate(foodid, { $inc: { likeCount: -1 } });

      const food = await foodmodel.findById(foodid);
      return res.json({
        liked: false,
        likeCount: food.likeCount,
        message: "Food unliked successfully",
      });
    }

    await likemodel.create({ user: userId, food: foodid });
    await foodmodel.findByIdAndUpdate(foodid, { $inc: { likeCount: 1 } });

    const food = await foodmodel.findById(foodid);
    res.json({
      liked: true,
      likeCount: food.likeCount,
      message: "Food liked successfully",
    });
  } catch (err) {
    console.error("❌ Error in likefoodcontroller:", err);
    res.json({ message: "Server error", error: err.message });
  }
}

 async function savefoodcontroller(req, res) {
  try {
    const { foodid } = req.body;
    const user = req.user;

    if (!foodid) {
      return res.json({ message: "Food ID is required" });
    }
    const foodDoc = await foodmodel.findById(foodid);
    if (!foodDoc) return res.json({ message: "Food not found" });
    const isalreadysaved = await savemodel.findOne({
      user: user._id,
      food: foodid,
    });

    if (isalreadysaved) {
      await savemodel.deleteOne({ user: user._id, food: foodid });
      const updated = await foodmodel.findByIdAndUpdate(
        foodid,
        { $inc: { saveCount: -1 } },
        { new: true }
      );
      if (updated.saveCount < 0) {
        updated.saveCount = 0;
        await foodmodel.findByIdAndUpdate(foodid, { saveCount: 0 });
      }

      return res.json({
        message: "Food unsaved successfully",
        saved: false,
        saveCount: Math.max(0, updated.saveCount),
      });
    }
    try {
      await savemodel.create({ user: user._1d || user._id, food: foodid });
    } catch (err) {
      if (err.code === 11000) {
        const already = await foodmodel.findById(foodid);
        return res.json({
          message: "Food already saved",
          saved: true,
          saveCount: already.saveCount,
        });
      }
      throw err;
    }
    const updated = await foodmodel.findByIdAndUpdate(
      foodid,
      { $inc: { saveCount: 1 } },
      { new: true }
    );

    return res.json({
      message: "Food saved successfully",
      saved: true,
      saveCount: updated.saveCount,
    });
  } catch (error) {
    console.error("savefoodcontroller error:", error);
    return res.json({ message: "Something went wrong" });
  }
}

 async function getSavedIds(req, res) {
  try {
    const user = req.user;
    const saves = await savemodel.find({ user: user._id }).select("food -_id");
    const ids = saves.map((s) => s.food.toString());
    return res.json({ savedIds: ids });
  } catch (err) {
    console.error("getSavedIds error:", err);
    return res.json({ message: "Something went wrong" });
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