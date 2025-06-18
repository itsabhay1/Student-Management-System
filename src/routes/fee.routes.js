import { Router } from "express";
import { createFee, getAllFees, updateFeeStatus, getPendingAmount } from "../controllers/fee.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { authorizeRoles } from "../middlewares/role.middlewares.js";

const router = Router();

router.use(verifyJWT);

// Admin-only: create & update
router.route("/").post(authorizeRoles("admin"), createFee);
router.route("/:id/status").put(authorizeRoles("admin"), updateFeeStatus);

// Anyone logged in can view fees
router.route("/").get(getAllFees);
router.route("/student/:studentId/pending").get(getPendingAmount);

export default router;
