import { Request, Response } from "express";
import { User } from "../usermodel.js";
import jwt from "jsonwebtoken";

const secretkey = process.env.JWT_SECRET!

export const login = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const { email, password } = user;

        const registeredUser = await User.findOne({
             email: email,
        });
        if (!registeredUser) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        }
    
        const isPasswordMatched = registeredUser?.password === password;
    
        if (!isPasswordMatched) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "wrong password",
            });
            return;
        }
        //something key
        const token = jwt.sign(
            { _id: registeredUser?._id, email: registeredUser?.email },
            secretkey,
            {expiresIn: "15m"}
        );
    
        res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            token: token
        });
    } 
    catch (error: any) {
        res.status(400).json({
            status: 400,
            message: error.message.toString()
        });
    }
};