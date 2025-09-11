import mongoose from "mongoose";
import usermodel from "../models/auth.user.model.js";
import foodpartmodel from "../models/auth.foodpartner.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



//user auth controllers
const userreg = async (req, res) => {
    const { name, email, password } = req.body;
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
        return res.json({ message: 'User already exists' });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new usermodel({ name, email, password: hashedpassword });
    await newuser.save();
    const token = jwt.sign({
        userId: newuser._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token,{
       httpOnly: true, 
  secure: true,      
  sameSite: "none", 
    })
    res.json({ message: 'User registered successfully', newuser });

}

const userlogin = async (req, res) => {
    const { email, password } = req.body;
    const existinguser = await usermodel.findOne({ email });
    if (!existinguser) {
        return res.json({ message: 'Invalid email or password' });
    }
    const ispasswordvalid = await bcrypt.compare(password, existinguser.password);
    if (!ispasswordvalid) {
        return res.json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({
        userId: existinguser._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token,{
      httpOnly: true,
  secure: true,      
  sameSite: "none",  
    })
    res.json({ message: 'User logged in successfully', existinguser });
}

const userlogout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'User logged out successfully' });
}

//food partner auth controllers
const foodpartreg = async (req, res) => {
    const { name, email, password } = req.body;
    const existingfoodpartner = await foodpartmodel.findOne({ email });
    if (existingfoodpartner) {
        return res.json({ message: 'Food-Partner already exists' });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newfoodpartner = new foodpartmodel({ name, email, password: hashedpassword });
    await newfoodpartner.save();
    const token = jwt.sign({
        userId: newfoodpartner._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token,
        {
       httpOnly: true,   
  secure: true,    
  sameSite: "none",  
    }
    )
    res.json({ message: 'Food-Partner registered successfully', newfoodpartner });
}

const foodpartlogin = async (req, res) => {
    const { email, password } = req.body;
    const existingfoodpartner = await foodpartmodel.findOne({ email });
    if (!existingfoodpartner) {
        return res.json({ message: 'Invalid email or password' });
    }
    const ispasswordvalid = await bcrypt.compare(password, existingfoodpartner.password);
    if (!ispasswordvalid) {
        return res.json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({
        foodpartnerId: existingfoodpartner._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token,{
        httpOnly: true,    
  secure: true,   
  sameSite: "none",  
    })
    res.json({ message: 'Food-Partner logged in successfully', existingfoodpartner });
}

const foodpartlogout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Food-Partner logged out successfully' });
}


export {
    userreg,
    userlogin, userlogout
    , foodpartreg, foodpartlogin, foodpartlogout
}