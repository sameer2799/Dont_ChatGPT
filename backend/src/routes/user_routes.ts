import { Router } from 'express';
import { getAllUsers, userLogin, userSignup, verifyUser, userLogout } from '../controllers/user_controllers.js';
import { loginValidator, signupValidator, validator } from '../utils/validators.js';
import { verifyToken } from '../utils/token_manager.js';

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validator(signupValidator), userSignup);
userRouter.post("/login", validator(loginValidator), userLogin);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, userLogout);

export default userRouter;