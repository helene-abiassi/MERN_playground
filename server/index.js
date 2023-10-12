import express from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import router from "./routes/personRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import personRoutes from "./routes/personRoutes.js";

dotenv.config();

const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
};

const startServer = () => {
  const port = process.env.PORT || 5005;

  app.listen(port, () => {
    console.log("Server is running on: ".bgGreen, port);
  });
};

const addRoutes = () => {
  app.use("/api", router);
  app.use("/api/places", placeRoutes);
  app.use("/api/people", personRoutes);
};

//CRUD Create Read Update Delete

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("connection to MongoDB :>>".bgCyan);
  } catch (error) {
    console.log("error in connection to MongoDB".bgMagenta, error);
  }
};

(async function controller() {
  await DBConnection();
  addMiddlewares();
  addRoutes();
  startServer();
})();

//NOTE - How to make use of the URL and query params to see how we organize/ get our data
//NOTE - The more values we give to our API, the better
//NOTE - Review URL&QUERY PARAMS 3in mongoose documentation
//NOTE - Review POPULATE method in mongoose documentation

// Ok response- smthg sent to the front end
//error for data submission
// inside ok error, error code for missing data
