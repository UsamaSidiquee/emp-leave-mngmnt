const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const leaveController = require("../controllers/leaveControllers");

const router = Router();

router.use("*", requireAuth);
router.get("/", leaveController.leave_index);
router.get("/all-leaves", leaveController.get_all_leaves);
router.post("/apply-leave", leaveController.leave_create_get);
router.post("/leave-details", leaveController.leave_details);
router.get("/user/apply-leave", leaveController.leave_create_get);
router.post("/user/apply-leave", leaveController.leave_create_post);
router.get("/user/leave-approve", leaveController.leave_approve_get);
router.post("/user/leave-approve", leaveController.leave_approve_post);

module.exports = router;
