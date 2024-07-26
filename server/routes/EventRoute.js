import { Router } from "express";
import { getAllEvents, createEvent } from "../controller/event.controller.js";

const route = Router();

route.get("/getAllEvents", getAllEvents);
route.post("/createEvent", createEvent);

export default route;
