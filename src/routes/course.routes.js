import { Router } from "express";
import {createCourse,getAllCourses,getCourseById,updateCourse,deleteCourse,enrollStudents,} from "../controllers/course.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { authorizeRoles } from "../middlewares/role.middlewares.js";

const router = Router();

router.use(verifyJWT);

// Admin can manage courses
router.route("/").post(authorizeRoles("admin"), createCourse);
router.route("/").get(getAllCourses);
router.route("/:id").get(getCourseById);
router.route("/:id").put(authorizeRoles("admin"), updateCourse);
router.route("/:id").delete(authorizeRoles("admin"), deleteCourse);

// Admin and Teacher can enroll students
router.route("/:id/enroll").post(authorizeRoles("admin", "teacher"), enrollStudents);

export default router;
