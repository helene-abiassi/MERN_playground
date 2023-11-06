import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { experienceModel } from "../models/experienceModel.js";
import { hashPassword, verifyPassword } from "../utilities/passwordServices.js";
import { generateToken } from "../utilities/tokenServices.js";

const getAllUsers = async (req, res) => {
  const allUsers = await userModel.find().populate([
    {
      path: "bookmarks",
      select: ["title", "publication_date", "photo"],
    },
    {
      path: "submissions",
      select: ["title", "publication_date", "photo"],
    },
  ]);

  console.log("allUsers :>> ", allUsers);

  res.json({
    number: allUsers.length,
    data: allUsers,
  });
};

const getUserById = async (req, res) => {
  const id = req.params._id;

  try {
    const userByID = await userModel.find({
      _id: id,
    });
    console.log("userByID :>> ", userByID);

    if (userByID.length > 0) {
      res.status(200).json({
        number: userByID.length,
        data: userByID,
      });
    } else {
      res.status(200).json({
        number: userByID.length,
        errorMessage: "OH NO! No such user with this id exists",
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

const uploadImage = async (req, res) => {
  console.log(req.file);

  //Upload the file to cloudinary /if/ there is a file in req
  if (req.file) {
    try {
      // Upload the image
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "voyageApp/userphotos",
      });
      console.log("uploadedImage", uploadedImage);
      res.status(200).json({
        message: "Image uploaded successfully",
        user_image: uploadedImage.secure_url,
      });
      // Save the photo in the userphoto collection
    } catch (error) {
      console.error("error", error);
    }
  } else {
    res.status(500).json({
      error: "File type not supported",
    });
  }
};

const signUp = async (req, res) => {
  console.log("req.body :>> ", req.body);

  try {
    const hashedPassword = await hashPassword(req.body.password);

    if (hashedPassword) {
      const existingUser = await userModel.findOne({ email: req.body.email });

      if (existingUser) {
        res.status(200).json({
          message: "email already exists in the db",
        });
      } else {
        try {
          const newUser = new userModel({
            // _id: req.body._id,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            user_image: req.body.user_image,
            bio: req.body.bio,
          });

          console.log("newUser :>> ", newUser);

          const savedUser = await newUser.save();
          res.status(201).json({
            message: "New user registered",
            user: {
              _id: savedUser._id,
              username: savedUser.username,
              email: savedUser.email,
              user_image: savedUser.user_image,
              bio: savedUser.bio,
            },
          });
        } catch (error) {
          console.log("error saving user :>> ", error);
          res.status(500).json({
            message: "something went wrong when registering your user",
          });
        }
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      message: "Oh no, it went wrong!",
    });
  }
};

const logIn = async (req, res) => {
  console.log("req.body :>> ", req.body);

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(404).json({
        msg: "no user found with this email",
      });
    } else {
      const checkPassword = await verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!checkPassword) {
        res.status(404).json({
          message: "Wrong password, try again",
        });
      }
      if (checkPassword) {
        const token = generateToken(existingUser._id);
        if (token) {
          res.status(200).json({
            message: "login success",
            user: {
              _id: existingUser._id,
              username: existingUser.username,
              email: existingUser.email,
              user_image: existingUser.user_image,
              bio: existingUser.bio,
            },
            token,
          });
        } else {
          console.log("error generating token");
          res.status(400).json({
            message: "something went wrong with your request",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "I don't have a clue",
    });
  }
};

const getProfile = async (req, res) => {
  console.log("req.USER :>> ", req.user);

  if (req.user) {
    res.status(200).json({
      userProfile: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        user_image: req.user.user_image,
        bio: req.user.bio,
        bookmarks: req.user.bookmarks,
        submissions: req.user.submissions,
        member_since: req.user.member_since,
      },
    });
  }
  if (!req.user) {
    res.status(200).json({
      message: "You need to log in to access this page",
    });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params._id;

  try {
    if (!userId) {
      return res.status(400).json({
        msg: "userId is required in the URL parameter",
      });
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        msg: "Experience not found",
      });
    }

    res.status(200).json({
      msg: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params._id;

  const filter = { _id: userId };

  const elementName = req.body.elementName;
  const elementValue = req.body.elementValue;
  const update = { [`${elementName}`]: elementValue };

  if (!userId) {
    return res.status(400).json({
      msg: "userId is required in the URL parameter",
    });
  }
  try {
    const updatedUser = await userModel.findByIdAndUpdate(filter, update, {
      new: true,
    });

    console.log("updatedUser :>> ", updatedUser);

    res.status(200).json({
      msg: "User updated successfully",
    });
  } catch (error) {
    console.log("error when trying to update user :>> ", error);
  }
};

const updatePhoto = async (req, res) => {};

export {
  uploadImage,
  signUp,
  getAllUsers,
  getUserById,
  logIn,
  getProfile,
  deleteUser,
  updateUser,
  updatePhoto,
};
