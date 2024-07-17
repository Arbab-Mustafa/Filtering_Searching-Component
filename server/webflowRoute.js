import { Router } from "express";
import { getWebflowData } from "./webflowController.js";
const route = Router();

// add route for webflow api

route.get("/webflow-api", getWebflowData);

export default route;
