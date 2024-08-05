import { Router } from "express";

import {
  createEmailList,
  getAllEmailList,
} from "../controller/EmailListController.js";

const route = Router();

route.get("/getAllEmailList", getAllEmailList);

route.post("/createEmailList", createEmailList);

export default route;
