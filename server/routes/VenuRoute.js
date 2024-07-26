import { Router } from "express";
import { createVenue, getAllVenus } from "../controller/venuController.js";

const route = Router();

route.get("/getAllVenues", getAllVenus);
route.post("/createVenue", createVenue);

export default route;
