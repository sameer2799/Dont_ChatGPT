import jwt from 'jsonwebtoken';

export const createToken = (id:string, email:string, expiry:string ) => {
    // create token
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:expiry, });
    return token;
}