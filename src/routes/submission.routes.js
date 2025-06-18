import { Router } from "express";
import { submitAssignment, evaluateSubmission, getSubmissionsByAssignment } from "../controllers/submission.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { authorizeRoles } from "../middlewares/role.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(authorizeRoles("student"), submitAssignment);
router.route("/:id/evaluate").put(authorizeRoles("teacher", "admin"), evaluateSubmission);
router.route("/assignment/:assignmentId").get(getSubmissionsByAssignment);

export default router;
