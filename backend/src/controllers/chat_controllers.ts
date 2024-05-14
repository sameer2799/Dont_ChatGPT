import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { configureOpenAI } from "../config/openai-config.js";
import ChatCompletionMessageParam from "openai";
import OpenAIApi from "openai";



export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const message = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).json({ message: "User not found" });
        };
        
        // grab chats of user
        const chats = user.chats.map(({ role, content}) => ({ role, content})) as unknown as ChatCompletionMessageParam[];
        chats.push({role: "user", content: message} as unknown as ChatCompletionMessageParam);
        user.chats.push({role: "user", content: message});

        const config = configureOpenAI();
        // @ts-ignore
        const openai = new OpenAIApi(config);
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            // @ts-ignore
            messages: chats,
        });

        user.chats.push(completion.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const sendChatsToUser = async (req:Request, res:Response, next:NextFunction) => {
    
    try {
        
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).send("User not registered or token expired");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(403).send("Unauthorized");
        };
        
    
        return res.status(200).json({message: "User Logged In", chats: user.chats});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", cause: error.message });
    }
};

export const deleteChats = async (req:Request, res:Response, next:NextFunction) => {
    
    try {
        
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).send("User not registered or token expired");
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(403).send("Unauthorized");
        };
        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({message: "Deleted Chats"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", cause: error.message });
    }
};