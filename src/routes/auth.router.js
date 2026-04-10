import Router from "express";
import authController from "../controller/auth.controller.js"
import fs from "node:fs"

const router = Router ();


// signup
router.post('/signup',authController.signup);

// login
router.post('/login',authController.login);

// logout 
router.get('/logout',authController.logout);

export default router;