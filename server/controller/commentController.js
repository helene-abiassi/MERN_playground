import { commentModel } from "../models/commentModel.js";
import { experienceModel } from "../models/experienceModel.js";

const getAllComments = async (req, res) => {
  // const commentUser = req.params.author;
  // console.log("user Params :>> ", commentUser);

  const allComments = await commentModel
    .find()
    .populate({ path: "author", select: ["username", "user_image"] });
  // console.log("allComments :>> ", allComments);

  res.json({
    number: allComments.length,
    data: allComments,
  });
};

// const getCommentsByUser = async (req, res) => {
//   const user = req.params;
//   console.log("user Params :>> ", user);
// };

export { getAllComments };
