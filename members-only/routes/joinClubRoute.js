import { Router } from "express";
import joinClubController from "../controllers/joinClubController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const joinClubRouter = Router();

joinClubRouter.get("/", isAuth, joinClubController.joinClubGet);
joinClubRouter.post("/", isAuth, joinClubController.joinClubPost);

export default joinClubRouter;