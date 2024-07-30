import { Router } from "express";
import {
  getAllEvents,
  createEvent,
  getEventById,
} from "../controller/eventcontroller.js";

const route = Router();

route.get("/getAllEvents", getAllEvents);
route.get("/getEvent/:id", getEventById);
route.post("/createEvent", createEvent);

export default route;
