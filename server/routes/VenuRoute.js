import { Router } from "express";
import {
  createVenue,
  getAllVenus,
  getVenue,
} from "../controller/venuController.js";

const route = Router();

route.get("/", getAllVenus);
route.get("/:name", getVenue);
route.post("/", createVenue);

export default route;
