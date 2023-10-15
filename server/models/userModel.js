import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/dfm1r4ikr/image/upload/v1697306522/voyageApp/profilephoto_bobolechien_bkun9g.png",
  },
  bio: {
    type: String,
  },
  member_since: {
    type: Date,
  },
  bookmarks: [
    {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
    },
  ],
  submissions: [
    {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
    },
  ],
  comments: [
    {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

export { userModel };
