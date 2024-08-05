import { Router } from "express";
import {
  createVenue,
  getAllVenus,
  getVenue,
} from "../controller/venuController.js";

const route = Router();

route.get("/getAllVenues", getAllVenus);
route.get("/getVenue/:name", getVenue);
route.post("/createVenue", createVenue);

export default route;
