import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import User from "../models/user.js";

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    // get all users
    try {
        const users = await User.find();
        return res.status(200).json({message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", cause: error.message });
    }
};

export const userSignup = async (req:Request, res:Response, next:NextFunction) => {
    // user signup
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return res.status(200).json({message: "User Created", id:user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", cause: error.message });
    }
};