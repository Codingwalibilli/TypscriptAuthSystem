import { Request, Response } from "express";
import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/usermodel";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies?.accessToken;

        if(!token){
            res.status(401).json({
                status: 401,
                message: "Invalid Cookies"
            });
            return;
        }

        const verifiedToken = jwt.verify(token, process.env.ACCESS_JWT_SECRET!) as 
        JwtPayload & {_id: string};
        const userid = await User.findById(verifiedToken?._id).select("_id");

        if (!userid){
            res.status(404).json({
                status: 404,
                message: "User not found"
            });
            return;
        }

        req.headers["userid"] = userid.id;
        next();
    } catch(error: any){
        console.log(error);
        res.status(400).json({
            status: 400,
            message: error.message.toString() || "Error Creating user"
    });
}};