import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request{
    admin?: any;
}

export const authenticateAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader){
            return res.status(401).json({
                message: "Access denied. No token provided",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as  string
        );
        req.admin = decoded;
        next();
    } catch(error){
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};