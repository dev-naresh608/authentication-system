import { Router } from "express";
import * as authController from "../controllers/auth.controller.js"
const authRoute = Router();


// POST : /api/auth/register 
authRoute.post('/register',authController.handleRegister);

// GET : /api/auth/get-me 
authRoute.get('/get-me',authController.handleGetMe);  

// GET : /api/auth/refresh-token
authRoute.get('/refresh-token',authController.handleRefreshToken);

export default authRoute;