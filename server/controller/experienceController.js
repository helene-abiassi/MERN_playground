import { experienceModel } from "../models/experienceModel.js";

const getAllExperiences = async (req, res) => {
  const allExperiences = await experienceModel.find();

  console.log("allExperiences :>> ", allExperiences);

  res.json({
    number: allExperiences.length,
    data: allExperiences,
  });
};

export { getAllExperiences };
