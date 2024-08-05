import { Router } from "express";

import {
  createEmailList,
  getAllEmailList,
} from "../controller/EmailListController.js";

const route = Router();

route.get("/", getAllEmailList);

route.post("/", createEmailList);

export default route;
