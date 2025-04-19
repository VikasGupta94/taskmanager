import jwt from "jsonwebtoken";
import { genVar } from "../config/genVar.js";

export const generateToken = (data) => {
    return jwt.sign(data, genVar.JWT_SECRET, { expiresIn: '5h' })
}
export const verifyToken = (token) => {
return jwt.verify(token,genVar.JWT_SECRET)
}