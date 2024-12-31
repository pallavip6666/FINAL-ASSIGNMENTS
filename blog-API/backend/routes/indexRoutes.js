import express from "express";
import controller from "../controllers/indexControllers.js";

const indexRouter = express.Router();

indexRouter.get("/posts", controller.getPosts);
indexRouter.get("/comments", controller.getComments);

indexRouter.post("/signIn", controller.signUp);
indexRouter.post("/login", controller.verifyLogin);

indexRouter.post("/newPost", controller.createNewPost);
indexRouter.post("/newComment", controller.postComment);

indexRouter.get("/userPosts", controller.getUserPosts);
indexRouter.get("/userUnpublishedPosts", controller.getUserUnpublishedPosts);

indexRouter.post("/newUnpublishedPost", controller.createNewUnpublishedPost);
indexRouter.post("/publishUnpublishedPost", controller.postUnpublishedPost);

indexRouter.post("/deletePost", controller.deletePost);
indexRouter.post("/deleteUnpublishedPost", controller.deleteUnpublishedPost);
indexRouter.post("/editPost", controller.editPost);
indexRouter.post("/editUnpublishedPost", controller.editUnpublishedPost);

export default indexRouter;