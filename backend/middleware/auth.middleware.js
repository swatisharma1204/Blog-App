import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if(!authHeader){
        return res.send({
            status: false,
            message: "Token missing"
        })
    }
    const token = authHeader.split("")[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.send({
            status: false,
            message: "Invalid token",
        });
    }
};

// export const isSuperAdmin = (req, res, next) => {
//     if(req.user.role!== "superAdmin"){
//         return res.send({
//             status: false,
//             message: "Admin access only"
//         });
//     }
//     next();
// }