import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: "place" }], //RAULNOTE - When do we put it into an array? If we determined it was an array in mongoose?
});

const personModel = mongoose.model("person", personSchema);

export { personModel };
