import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';

export const createToken = (id:string, email:string, expiry:string ) => {
    // create token
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:expiry, });
    return token;
}

export const verifyToken = async (req : Request, res: Response, next: NextFunction) => {
    // verify token
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not found. Login Again" });
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired. Login Again" });
            }else{
                
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    }
)};