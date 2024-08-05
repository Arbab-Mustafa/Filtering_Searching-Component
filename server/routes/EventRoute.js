import { Router } from "express";
import {
  getAllEvents,
  createEvent,
  getEventById,
  getEventByCity,
} from "../controller/eventcontroller.js";

const route = Router();

route.get("/getAllEvents", getAllEvents);
route.get("/getEvent/:id", getEventById);
route.get("/getEvents/:city", getEventByCity);
route.post("/createEvent", createEvent);

export default route;
