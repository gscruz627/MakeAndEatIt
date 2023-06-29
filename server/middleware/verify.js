import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;
export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if(!token){
            res.status(401).json({reason: "No token along with request"})
        }
        if(token.startsWith("Holder ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch(reason){
        res.status(500).json({reason: "Error on Verify Middleware with JWT, reason: " + reason})
    }
}