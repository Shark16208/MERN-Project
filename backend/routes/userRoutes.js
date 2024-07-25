/* specifies all the accepted URL routes and lists what function 
to run depending on the specific path. Each route acts like a propery on the "router" object,
which in turn is an instance of the Router class that comes with express. */
import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
