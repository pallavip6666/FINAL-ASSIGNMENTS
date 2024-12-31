import { Router } from "express";
import signupController from "../controllers/signupController.js";
import signUpValidation from "../validation/userSignUpValidation.js";

const signupRouter = Router();

signupRouter.get("/", signupController.signupGet);
signupRouter.post("/", signUpValidation, signupController.signupPost);

export default signupRouter;