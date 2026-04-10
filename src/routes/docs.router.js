import docs from "../controller/docs.controller.js"
import { auth } from "../middlewares/auth.js";
import adminCheck from "../middlewares/adminCheck.js";

import Router from "express";

const router = Router ();

router.get('/admin/dashboard/doctors',auth,adminCheck,docs.getAllDocs)

router.post('/admin/dashboard/doctors',auth,adminCheck,docs.addDoc)
router.delete('/admin/dashboard/doctors',auth,adminCheck,docs.deleteDoc)

export default router ;