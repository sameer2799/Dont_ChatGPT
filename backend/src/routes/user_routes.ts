import { Router } from 'express';
import { getAllUsers, userSignup } from '../controllers/user_controllers.js';
import { signupValidator, validator } from '../utils/validators.js';

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validator(signupValidator), userSignup);

export default userRouter;