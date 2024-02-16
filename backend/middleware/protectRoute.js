import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({error: "Unauthorized: No token provided"});
        } 

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode) {
            return res.status(401).json({error: "Unauthorized: Invalid token"});

        }

        const user = await User.findById(decode.userId).select("-password");

        if(!user) {
            return res.status(401).json({error: "User not found"});
        }

        req.User = user

        next();


    } catch (error) {
        console.log("Error is getting protect route: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export default protectRoute;