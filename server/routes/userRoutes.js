import express from "express";
import { getAllUsers } from "../controller/userController";

const router = express.Router();

router.get("/users", getAllUsers);

export default router;
