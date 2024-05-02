import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/user.js";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({message: "Conflict", cause: "User already exists" });
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.clearCookie(COOKIE_NAME,{
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        }
        );

        // create token and set cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
            expires,
        
        })

        return res.status(201).json({message: "User Created", id:user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", cause: error.message });
    }
};

export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
    // user login
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({message: "Not Found", cause: "User not registered" });
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({message: "Unauthorized", cause: "Invalid Password" });
        }
        // clear existing cookie
        res.clearCookie(COOKIE_NAME,{
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        }
        );

        // create token and set cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
            expires,
        
        })

        return res.status(200).json({message: "User Logged In", id:user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", cause: error.message });
    }
};