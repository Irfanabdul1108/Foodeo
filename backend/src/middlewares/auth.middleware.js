import jwt from "jsonwebtoken";
import usermodel from "../models/auth.user.model.js";
import foodpartmodel from "../models/auth.foodpartner.model.js";

const authusermiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized: No token provided" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.userId) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized: Invalid token" 
            });
        }

        const user = await usermodel.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized: User not found" 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized: Invalid token" 
        });
    }
};

const authfoodpartnermiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized: No token provided" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.foodpartnerId) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized: Invalid token" 
            });
        }

        const foodpartner = await foodpartmodel.findById(decoded.foodpartnerId).select('-password');
        
        if (!foodpartner) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized: Food partner not found" 
            });
        }

        req.foodpartner = foodpartner;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized: Invalid token" 
        });
    }
};

export { authusermiddleware, authfoodpartnermiddleware };