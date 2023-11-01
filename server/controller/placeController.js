import placeModel from "../models/placeModel.js";

const getAllPlaces = async (req, res) => {
  const allPlaces = await placeModel.find();
  console.log("allPlaces :>> ", allPlaces);
  //TODO -  Add the likes logic to /all places function as well
  res.json({
    number: allPlaces.length,
    data: allPlaces,
  });
};

//Setting up my URL Params
const getPlacesByName = async (req, res) => {
  const name = req.params.name;

  const { likes } = req.query; //Setting up Query Params

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
      const placeNames = await placeModel.find({ name: name });

      if (placeNames.length > 0) {
        res.status(200).json({
          number: placeNames.length,
          data: placeNames,
        });
      } else {
        res.status(200).json({
          number: placeNames.length,
          errorMessage: `Sorry no places with the name ${name} exist.`,
        });
      }
    } catch (error) {
      console.log("placeNames error :>> ", error);
      res.status(500).json();
    }
  }
};

export { getAllPlaces, getPlacesByName };
//TODO Review which error code to use / when (here and below)

const getCitiesByCountryCode = async (req, res) => {
  // console.log("req :>> ".bgMagenta, req);
  // const countryCode = req.params.countryCode;
  const { countryCode } = req.params;
  const { likes } = req.query;

  if (likes) {
    try {
      const cities = await cityModel.find({
        countryCode: countryCode,
        likes: { $gte: likes },
      });
      res.status(200).json({
        number: cities.length,
        cities,
      });
    } catch (error) {}

    //do stuff using likes
  } else {
    //all of the stuff below happens when there are no "likes" sent from the client.
    try {
      const cities = await cityModel.find({ countryCode: countryCode });
      if (cities.length > 0) {
        res.status(200).json({
          number: cities.length,
          cities,
        });
      } else {
        res.status(200).json({
          number: cities.length,
          message: `sorry no cities with  country code ${countryCode}`,
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        errorMessage: "something went wrong in the request",
        error,
      });
    }
  }
};
