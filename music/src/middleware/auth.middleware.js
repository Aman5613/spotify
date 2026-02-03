import config from "../config/config.js";
import jwt from "jsonwebtoken";

export async function artistAuthMiddleware(req, res, next){
    try {

        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message : "Unauthorized access, token not found",
                success : false,
                error : true
            })
        }
        // verify token
        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.fullName = decoded.fullName;
        req.userID = decoded.id;
        req.role = decoded.role;

        if(!decoded || decoded.role !== "artist"){
            return res.status(401).json({
                message : "Unauthorized access, invalid token",
                success : false,
                error : true
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error" + error.message || error,
            success : false,
            error : true
        })
    }
}