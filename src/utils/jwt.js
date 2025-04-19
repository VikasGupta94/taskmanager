import jwt from "jsonwebtoken";
import serverConfig  from "../config/server-config.js";

export const generateToken = (data) => {
    return jwt.sign(data, serverConfig.JWT_SECRET, { expiresIn: '5h' })
}
export const verifyToken = (token) => {
return jwt.verify(token,serverConfig.JWT_SECRET)
}