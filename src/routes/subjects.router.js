import subjectController from "../controller/subjects.controller.js"
import { auth } from "../middlewares/auth.js";
import adminCheck from "../middlewares/adminCheck.js";

import Router from "express";

const router = Router ();

router.post('/admin/dashboard/subject',auth,adminCheck,subjectController.createSubject)
router.get('/admin/dashboard/subject',auth,adminCheck,subjectController.getAllSubjects)
router.put('/admin/dashboard/subject',auth,adminCheck,subjectController.editeSubject)
router.delete('/admin/dashboard/subject',auth,adminCheck,subjectController.deleteSuject)
router.get('/admin/dashboard/get_subject/:id',auth,adminCheck,subjectController.getSubject)


export default router ;