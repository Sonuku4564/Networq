import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUserNotifications, markNotificationasRead, deleteNotification  } from "../controllers/notificationController.js";



const router = express.Router();

router.get("/", protectRoute, getUserNotifications);

router.put("/:id/read" , protectRoute, markNotificationasRead);

router.delete("/:id", protectRoute, deleteNotification);

export default router;