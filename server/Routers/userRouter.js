

import  { Router } from 'express'
import {
  deleteUser,
  followUser,
  getUser,
  unFollowUser,
  updateUser,
  getAllUser,
  
} from "../controllers/UserController.js";
// import authMiddleWare from '../middleware/authMiddleware.js';

const router = Router()
router.get("/", getAllUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);

router.delete("/:id",deleteUser);
router.put("/:id/follow",followUser);
router.put("/:id/unfollow",unFollowUser);
export default router