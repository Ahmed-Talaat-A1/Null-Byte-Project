import Router from "express";
import { auth } from "../middlewares/auth.js";
import adminCheck from "../middlewares/adminCheck.js";
import adminController from "../controller/admin.controller.js";


const router = Router ();

router.get('/admin/dashboard/users',auth,adminCheck,adminController.getAllUsers)
router.post('/admin/dashboard/users',auth,adminCheck,adminController.addUser)
router.put('/admin/dashboard/users',auth,adminCheck,adminController.editeUser)
router.delete('/admin/dashboard/users',auth,adminCheck,adminController.deleteUser)
router.get('/admin/dashboard/get_user/:id',auth,adminCheck,adminController.getUser)
router.get('/admin/dashboard/count',auth,adminCheck,adminController.dashbaord)

export default router;