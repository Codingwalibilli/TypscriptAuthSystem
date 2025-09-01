import { Request, Response } from "express"
import { User } from "../models/usermodel"

export const logout = async (req: Request, res: Response) => {
    try{
        await User.findByIdAndUpdate(
            req.headers["userid"] as string,{
                $unset:{
                    refreshToken: 1
                }
            },
            {new:true}
        );

        return res.status(200)
        .clearCookie("accessToken", {httpOnly: true})
        .clearCookie("refreshToken", {httpOnly: true})
        .json({
            status: 200,
            message: "User logged out"
        })
    } catch(error: any){
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message.toString() || "Cant logout user"
        })
    }
}