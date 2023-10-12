import placeModel from "../models/placeModel.js";

const getAllPlaces = async (req, res) => {
  const allPlaces = await placeModel.find();
  console.log("allPlaces :>> ", allPlaces); //TODO -  Add the likes logic to /all places function as well
  res.json({
    number: allPlaces.length,
    data: allPlaces,
  });
};

//Setting up my URL Parameters
const getPlacesByName = async (req, res) => {
  const name = req.params.name;

  const { likes } = req.query;

  if (likes) {
    try {
      const placeNames = await placeModel.find({
        name: name,
        likes: { $gte: likes },
      });
      res.status(200).json({
        number: placeNames.length,
        data: placeNames,
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
    //
  } else {
    try {
      const placeNames = await placeModel.find({ name: name }); //RAULNOTE - Params and values are case sensitive?

      if (placeNames.length > 0) {
        res.status(200).json({
          number: placeNames.length,
          data: placeNames,
        });
      } else {
        res.status(200).json({
          number: placeNames.length,
          errorMessage: `Sorry no places with the name ${name} exist.`,
        }); //TODO Review which error code to use / when (here and below)
      }
    } catch (error) {
      console.log("placeNames error :>> ", error);
      res.status(500).json();
    }
  }
};

export { getAllPlaces, getPlacesByName };
