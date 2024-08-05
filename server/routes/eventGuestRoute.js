import { Router } from "express";
import {
  createEventGuest,
  getAllEventGuests,
} from "../controller/eventGuestController.js";

const route = Router();

route.get("/", getAllEventGuests);

route.post("/", createEventGuest);

export default route;
