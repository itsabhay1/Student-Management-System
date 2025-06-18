import { Router } from "express";
import { markAttendance, getAttendanceByStudent, getAttendanceByDate, getLowAttendanceStudents} from "../controllers/attendance.controller.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { authorizeRoles } from "../middlewares/role.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(authorizeRoles("admin", "teacher"), markAttendance);
router.route("/student/:studentId").get(getAttendanceByStudent);
router.route("/by-date").get(getAttendanceByDate);
router.route("/low-attendance").get(authorizeRoles("admin"), getLowAttendanceStudents);

export default router;
