import { Router } from "express";
import {
  createEventGuest,
  getAllEventGuests,
} from "../controller/eventGuestController.js";

const route = Router();

route.get("/getAllEventGuests", getAllEventGuests);

route.post("/createEventGuest", createEventGuest);

export default route;
