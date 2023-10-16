import { v2 as cloudinary } from "cloudinary";

// const getAllUsers = async (req, res) => {
//   const allUsers = await userModel.find();

//   console.log("allUsers :>> ", allUsers);

//   res.json({
//     number: allUsers.length,
//     data: allUsers,
//   });
// };

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
        userImage: uploadedImage.secure_url,
      });
      // Save the photo in the userphoto collection
    } catch (error) {
      console.error("error", error);
    }
  } else {
    res.status(5000).json({
      error: "File type not supported",
    });
  }
};

export { uploadImage };
