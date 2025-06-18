import { Router } from "express";
import {createSchedule,getAllSchedules,getTimetableByDay} from "../controllers/timetable.controller.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { authorizeRoles } from "../middlewares/role.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(authorizeRoles("admin"), createSchedule);
router.route("/").get(getAllSchedules);
router.route("/day/:day").get(getTimetableByDay);

export default router;
