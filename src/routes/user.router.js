import Router from "express";
import userController from "../controller/user.controller.js"
import fs from "node:fs"
import { auth } from "../middlewares/auth.js";

const router = Router ();

//my acc
router.get("/me",auth,userController.getMe)


// edite my acc
router.put('/me',auth,userController.putMe)

//delete my acc
router.delete('/me',auth,userController.deleteMe)

export default router ;