import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  author: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  publication_date: {
    type: Date,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/dfm1r4ikr/image/upload/v1697311768/voyageApp/expphoto_treptowerPark_hrlyk7.png",
  },
  location: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  experience_type: {
    type: String,
    required: true,
  },
  text_body: {
    type: String,
  },
  photo_body: [
    {
      type: String,
    },
  ],
  times_bookmarked: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
    },
  ],
});

const experienceModel = mongoose.model("experience", experienceSchema);

export { experienceModel };
