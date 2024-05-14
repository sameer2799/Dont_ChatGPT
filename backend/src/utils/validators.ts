import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validator = (validations: ValidationChain[] ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {   
            const error = await validation.run(req);
            if (!error.isEmpty()) {
                break;
                // return res.status(400).json({ message: "Bad Request", errors: result.errors });
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ message: "Bad Request", errors: errors.array() });
    };
};

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters long"),
];

export const signupValidator = [
    body("username").isString().isLength({ min: 3 }).notEmpty().withMessage("Username is required"),
    ...loginValidator,
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required")    
];