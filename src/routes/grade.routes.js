import { Router } from "express";
import { assignGrade, updateGrade, getGradesByStudent, getGradesByCourse, getStudentGPA} from "../controllers/grade.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { authorizeRoles } from "../middlewares/role.middlewares.js";

const router = Router();

router.use(verifyJWT);

// Assign or update grades (admin or teacher)
router.route("/").post(authorizeRoles("admin", "teacher"), assignGrade);
router.route("/:id").put(authorizeRoles("admin", "teacher"), updateGrade);

// View grades by student or course
router.route("/student/:studentId").get(getGradesByStudent);
router.route("/course/:courseId").get(getGradesByCourse);

// Get Gpa for student
router.route("/student/:studentId/gpa").get(getStudentGPA);

export default router;
