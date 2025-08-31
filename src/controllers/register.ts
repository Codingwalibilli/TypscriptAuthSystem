import { Request, Response } from "express";
import { User } from "../models/usermodel.js";

export const register = async (req: Request, res: Response) =>  {
    try {
        const user = req.body;
        const { name, email, password } = user;

        const registeredEmail = await User.findOne({
            email: email,
        });

        if (registeredEmail) {
            res.status(400).json({
                status: 400,
                message: "Email is already registered",
            });
            return;
        }

        // use encryption
        const newUser = await User.create({
            name,
            email,
            password,
        });

        const username = newUser.name

        res.status(200).json({
            status: 201,
            success: true,
            message: "User created Successfully",
            username: username 
        });
    } 
    catch (error: any) {
        console.log(error);
        res.status(400).json({
            status: 400,
            message: error.message.toString() || "Error Creating user"
        });
    }
};