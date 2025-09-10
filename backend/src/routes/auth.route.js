import express from "express";
import {userreg,userlogin,userlogout,foodpartreg,foodpartlogin,foodpartlogout} from "../controllers/auth.controller.js";
const router = express.Router();

//user authentication routes
router.post('/user/reg',userreg)
router.post('/user/login',userlogin)
router.post('/user/logout',userlogout)



//food-partner authentication routes
router.post('/food-partner/reg',foodpartreg)
router.post('/food-partner/login',foodpartlogin)
router.post('/food-partner/logout',foodpartlogout)


export default router;
