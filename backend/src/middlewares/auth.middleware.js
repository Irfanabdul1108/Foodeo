import foodpartmodel from "../models/auth.foodpartner.model.js";
import usermodel from "../models/auth.user.model.js";
import jwt from 'jsonwebtoken'

async function authfoodpartnermiddleware(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.json({
            message: 'Unauthorized'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodpartner = await foodpartmodel.findById(decoded.foodpartnerId)
        req.foodpartner = foodpartner
        next()
    } catch (error) {
        res.json({ message: 'invalid token' })
    }
}

async function authusermiddleware(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.json({
            message: 'Unauthorized'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await usermodel.findById(decoded.userId)
        req.user = user
        next()
    } catch (error) {
        res.json({ message: 'invalid token' })
    }
}

export {
    authfoodpartnermiddleware,
    authusermiddleware   
}