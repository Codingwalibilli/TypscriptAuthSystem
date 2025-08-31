import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateRefreshAndAccessToken } from "../util/tokenGenerator";
import { User } from "../models/usermodel";

export const refreshAccess = async (req: Request, res: Response) => {
    try{
        const userToken = req.cookies?.refreshToken;
        if(!userToken){
            res.status(404).json({
                status: 404,
                message: "No Refresh Token Found"
            });
            return;
        }

        const verifiedToken = jwt.verify(userToken, process.env.REFRESH_JWT_SECRET!) as
        JwtPayload & {_id: string};
        const user = await User.findById(verifiedToken?._id);

        if(!user){
            res.status(404).json({
                status: 404,
                message: "User not found"
            });
            return;
        }

        const {accessToken, refreshToken} = 
        generateRefreshAndAccessToken(user?.id);

        user.refreshToken = refreshToken;
        await user.save();

        const options = {
            httpOnly : true,
            secure: true
        }

        res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            status: 200,
            message: "Tokens refreshed Succesfully",
            tokens: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        })

        
    } catch(error:any){
        console.log(error);
        res.status(400).json({
            status: 400,
            message: error.message.toString() || "Error Refreshing Token"
        });
    }
}