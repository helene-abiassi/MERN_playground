import { personModel } from "../models/personModel.js";

const getAllPeople = async (req, res) => {
  const allPeople = await personModel
    .find()
    .populate({ path: "places", select: ["name", "location", "likes"] });
  console.log("allPeople :>> ", allPeople);

  res.json({
    number: allPeople.length,
    data: allPeople,
  });
};

export { getAllPeople };
