import { commentModel } from "../models/commentModel.js";
import { experienceModel } from "../models/experienceModel.js";

const getAllExperiences = async (req, res) => {
  const allExperiences = await experienceModel.find().populate([
    {
      path: "bookmarked_by",
      select: ["username", "bio", "member_since", "user_image"],
    },
    { path: "comments" },
    {
      path: "user",
      select: ["username", "bio", "member_since", "user_image"],
    },
  ]);

  // console.log("allExperiences :>> ", allExperiences);

  res.json({
    number: allExperiences.length,
    data: allExperiences,
  });
};

const getExperiencesByType = async (req, res) => {

  const { experienceType } = req.params;

  try {
    const experiences = await experienceModel.find({
      experienceType: experienceType,
    });

    if (experiences.length > 0) {
      res.status(200).json({
        number: experiences.length,
        data: experiences,
      });
    } else {
      res.status(200).json({
        number: experiences.length,
        errorMessage: "OH NO! No such type exists",
      });
    }
  } catch (error) {
    console.log("expType error :>> ", error);
    res.status(500).json({
      errorMessage: "something went wrong in the request",
      error,
    });
  }
};

export { getAllExperiences, getExperiencesByType };
