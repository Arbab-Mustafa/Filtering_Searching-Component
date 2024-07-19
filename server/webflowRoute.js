import { Router } from "express";
import { getWebflowData } from "./webflowController.js";
const route = Router();

// add route for webflow api

route.get("/", getWebflowData);

export default route;
