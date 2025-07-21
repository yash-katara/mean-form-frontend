import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  downloadUserPDF,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/pdf/:id", downloadUserPDF); // PDF download route

export default router;
