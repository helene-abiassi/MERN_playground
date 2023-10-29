import express from "express";
import {
  getAllExperiences,
  getExperiencesByCity,
  getExperiencesByCountry,
  getExperiencesById,
  getExperiencesByType,
  submitExperience,
  uploadMultiplePhotos,
  uploadPhoto,
} from "../controller/experienceController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

//GET Routes
router.get("/all", getAllExperiences);
router.get("/id/:_id", getExperiencesById);
router.get("/type/:experienceType", getExperiencesByType);
// router.get("/:country/:city", getExperiencesByCity);
router.get("/country/:country", getExperiencesByCountry);

//POST Routes
router.post("/experiencesubmission", submitExperience);
router.post("/mainphotoupload", multerUpload.single("photo"), uploadPhoto);
router.post(
  "/photoalbumupload",
  multerUpload.array("photo_body", 4),
  uploadMultiplePhotos
);

export default router;
