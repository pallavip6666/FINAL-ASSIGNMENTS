import { Router } from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import becomeAdminController from "../controllers/becomeAdminController.js";

const becomeAdminRouter = Router();

becomeAdminRouter.get("/", isAuth, becomeAdminController.becomeAdminGet);
becomeAdminRouter.post("/", isAuth, becomeAdminController.becomeAdminPost);

export default becomeAdminRouter;