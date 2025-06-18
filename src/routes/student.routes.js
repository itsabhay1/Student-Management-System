import { Router } from "express";
import {createStudent,getAllStudents,getStudentById,updateStudent,deleteStudent,} from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { authorizeRoles } from "../middlewares/role.middlewares.js";

const router = Router();

router.use(verifyJWT); // secured - required login

router.route("/").post(authorizeRoles("admin"), createStudent);
router.route("/").get(getAllStudents);
router.route("/:id").get(getStudentById);
router.route("/:id").put(authorizeRoles("admin"), updateStudent);
router.route("/:id").delete(authorizeRoles("admin"), deleteStudent);

export default router;
