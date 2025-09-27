import mongoose from "mongoose";
import usermodel from "../models/auth.user.model.js";
import foodpartmodel from "../models/auth.foodpartner.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userreg = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password must be at least 6 characters' 
            });
        }

        const existinguser = await usermodel.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists' 
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newuser = new usermodel({ name, email, password: hashedpassword });
        await newuser.save();

        res.status(200).json({ 
            success: true, 
            message: 'User registered successfully', 
            user: newuser 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
}

const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        const existinguser = await usermodel.findOne({ email });
        if (!existinguser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        const ispasswordvalid = await bcrypt.compare(password, existinguser.password);
        if (!ispasswordvalid) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign({
            userId: existinguser._id,
        }, process.env.JWT_SECRET)
        
      res.cookie('token', token,{
       httpOnly: true, 
  secure: true,      
  sameSite: "none", 
    })

        res.status(200).json({ 
            success: true, 
            message: 'User logged in successfully', 
            user: existinguser 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
}

const userlogout = async (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'User logged out successfully' });
}

const foodpartreg = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password must be at least 6 characters' 
            });
        }

        const existingfoodpartner = await foodpartmodel.findOne({ email });
        if (existingfoodpartner) {
            return res.status(400).json({ 
                success: false, 
                message: 'Food-Partner already exists' 
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newfoodpartner = new foodpartmodel({ name, email, password: hashedpassword });
        await newfoodpartner.save();

        res.status(200).json({ 
            success: true, 
            message: 'Food-Partner registered successfully', 
            foodpartner: newfoodpartner 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
}

const foodpartlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        const existingfoodpartner = await foodpartmodel.findOne({ email });
        if (!existingfoodpartner) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        const ispasswordvalid = await bcrypt.compare(password, existingfoodpartner.password);
        if (!ispasswordvalid) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign({
            foodpartnerId: existingfoodpartner._id,
        }, process.env.JWT_SECRET)
      res.cookie('token', token,{
       httpOnly: true, 
  secure: true,      
  sameSite: "none", 
    })

        res.status(200).json({ 
            success: true, 
            message: 'Food-Partner logged in successfully', 
            foodpartner: existingfoodpartner 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
}

const foodpartlogout = async (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Food-Partner logged out successfully' });
}

export {
    userreg,
    userlogin, 
    userlogout,
    foodpartreg, 
    foodpartlogin, 
    foodpartlogout
}