import { Router } from 'express';
import { getAllUsers, userLogin, userSignup } from '../controllers/user_controllers.js';
import { loginValidator, signupValidator, validator } from '../utils/validators.js';

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validator(signupValidator), userSignup);
userRouter.post("/login", validator(loginValidator), userLogin);

export default userRouter;