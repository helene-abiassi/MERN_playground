import express from "express";
import { getAllPeople } from "../controller/personController.js";

const router = express.Router();

router.get("/all", getAllPeople);

export default router;
