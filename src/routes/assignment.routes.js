import { Router } from "express";
import {createAssignment, getAssignments,} from "../controllers/assignment.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { authorizeRoles } from "../middlewares/role.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(authorizeRoles("teacher", "admin"), createAssignment);
router.route("/").get(getAssignments);

export default router;
