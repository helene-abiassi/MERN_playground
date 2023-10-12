import express from "express";
import {
  getAllPlaces,
  getPlacesByName,
} from "../controller/placeController.js";

const router = express.Router();

router.get("/all", getAllPlaces);
router.get("/:name", getPlacesByName);

export default router;
