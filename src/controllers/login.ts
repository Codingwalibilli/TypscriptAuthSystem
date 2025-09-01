import { Request, Response } from "express";
import { User } from "../models/usermodel.js";
import {generateRefreshAndAccessToken} from "../util/tokenGenerator.js"

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

        const {accessToken, refreshToken} = 
        generateRefreshAndAccessToken(registeredUser?._id.toString());

        registeredUser.refreshToken = refreshToken
        await registeredUser.save()
        
        res.status(200)
        .cookie("accessToken", accessToken, {httpOnly: true,})
        .cookie("refreshToken", refreshToken, {httpOnly: true,})
        .json({
            status: 200,
            message: "User Logged in Successfully",
            user: {
                name: registeredUser.name,
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        });
    } 
    catch (error: any) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message.toString()
        });
    }
};