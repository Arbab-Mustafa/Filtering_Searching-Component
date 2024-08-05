import { Router } from "express";
import {
  getAllEvents,
  createEvent,
  getEventById,
  getEventByCity,
} from "../controller/eventcontroller.js";

const route = Router();

route.get("/", getAllEvents);
route.get("/:id", getEventById);
route.get("/:city", getEventByCity);
route.post("/", createEvent);

export default route;
