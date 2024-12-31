import { Router } from "express";
import messageController from "../controllers/messageController.js";
import { isAdmin, isAuth } from "../middleware/authMiddleware.js"; // checks if user is logged in

const messageRouter = Router();

messageRouter.get("/", isAuth, messageController.messagesGet);
messageRouter.get("/new", isAuth, messageController.newMessageGet);
messageRouter.post("/new", isAuth, messageController.newMessagePost);
messageRouter.post("/delete/:messageId", isAdmin, messageController.deleteMessagePost);

export default messageRouter;