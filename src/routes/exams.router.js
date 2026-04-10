import examsController from "../controller/exams.controller.js";
import { auth } from "../middlewares/auth.js";
import adminCheck from "../middlewares/adminCheck.js";


import Router from "express";

const router = Router ();

router.post('/admin/dashboard/exams',auth,adminCheck,examsController.createExams)

export default router