import sequelize from "../configs/db.js";
import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    const token = req.access_token
    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user=decoded
        next()  
    }

else{
    res.status(400).json({errot:"No token found"})
}
}
