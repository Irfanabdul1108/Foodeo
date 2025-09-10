import express from "express";
import {createFood,getfooditems,foodpartnerbyid,likefoodcontroller,savefoodcontroller,getSavedIds} from "../controllers/food.controller.js";
import {authfoodpartnermiddleware,authusermiddleware} from "../middlewares/auth.middleware.js";
import multer from 'multer'
const router = express.Router();
const upload=multer({
    storage:multer.memoryStorage()
})

router.post('/',authfoodpartnermiddleware,upload.single('video'),createFood)

router.get('/',authusermiddleware,getfooditems)

router.get('/food-partner/:id',authusermiddleware,foodpartnerbyid)

router.post('/like',authusermiddleware,likefoodcontroller)

router.post('/save',authusermiddleware,savefoodcontroller)

router.get("/savedIds", authusermiddleware, getSavedIds);

export default router;
