import { commentModel } from "../models/commentModel.js";
import { experienceModel } from "../models/experienceModel.js";
import { userModel } from "../models/userModel.js";

const getAllComments = async (req, res) => {
  const allComments = await commentModel
    .find()
    .populate({ path: "author", select: ["email", "username", "user_image"] });

  res.json({
    number: allComments.length,
    data: allComments,
  });
};

const getCommentsByUserId = async (req, res) => {
  const { author } = req.params;

  try {
    const commentsByUserId = await commentModel.find({
      author: author,
    });
    console.log("commentsByUserId :>> ", commentsByUserId);

    if (commentsByUserId.length > 0) {
      res.status(200).json({
        number: commentsByUserId.length,
        data: commentsByUserId,
      });
    } else {
      res.status(200).json({
        number: commentsByUserId.length,
        errorMessage: "OH NO! No comments by this user exist",
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

const submitComment = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      try {
        const newComment = new commentModel({
          author: existingUser._id,
          message: req.body.message,
        });
        const savedComment = await newComment.save();

        console.log("newComment :>> ", savedComment);
        res.status(201).json({
          message: "Comment posted successfully",
          comment: savedComment,
        });
      } catch (error) {
        console.log("error leaving comment:>> ", error);
        res.status(500).json({
          message: "something went wrong when trying to leave a comment",
        });
      }
    } else {
      res.status(401).json({
        message: "you need to be logged in to leave a comment",
      });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      message: "Oh no! something went wrong!",
    });
  }
};



export {
  getAllComments,
  getCommentsByUserId,
  submitComment,
};
