import model from "../prisma/queries.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import middleware from "../middleware/passport.js";

async function signUp(req, res) {
  try {
    const { username, fullname } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await model.createUserQuery(username, fullname, hashedPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(`error at signUp(), ${error}`);
  }
}

// Verifies login and generates token.
function verifyLogin(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // Authentication failed
      return res.status(401).json({ message: info?.message || "Login failed" });
    }

    // If user is authenticated, generate a token
    const token = middleware.generateToken(user);
    return res.json({ accessToken: token });
  })(req, res, next);
}

async function createNewPost(req, res) {
  try {
    const { title, description, username } = req.body;

    const user = await model.getUserFromUsername(username);

    await model.createPostQuery(user.fullname, user.id, title, description);

    res.status(201).json({ message: "Post successful" });
  } catch (error) {
    console.log(`error at createNewPost(), ${error}`);
  }
}

async function getPosts(req, res) {
  try {
    const posts = await model.getPostsQuery();
    res.status(201).json(posts);
  } catch (error) {
    console.log(`error at getPosts(), ${error}`);
  }
}

async function getComments(req, res) {
  try {
    const { postId } = req.query;
    const intPostId = parseInt(postId);

    const comments = await model.getCommentsQuery(intPostId);
    res.status(201).json(comments);
  } catch (error) {
    console.log(`error at getComments(), ${error}`);
  }
}

async function postComment(req, res) {
  try {
    // Because the response is sent weird ({"8":{"name":"ocmm","comment":"ah"}}), how we extract the results is a bit different:
    const requestData = req.body;

    const postIdString = Object.keys(requestData)[0];
    const postId = parseInt(postIdString);

    const { name, comment } = requestData[postId];

    await model.newCommentQuery(name, comment, postId);

    res.status(201).json({ message: `comment successfully uploaded` });
  } catch (error) {
    console.log(`error at postComment(), ${error}`);
  }
}

// Frontend2 controllers below:
async function getUserPosts(req, res) {
  try {
    const { username } = req.query;

    const user = await model.getUserFromUsername(username);

    const posts = await model.getUserPostsQuery(user.id);
    res.status(201).json(posts);
  } catch (error) {
    console.log(`error at getUserPosts(), ${error}`);
  }
}

async function getUserUnpublishedPosts(req, res) {
  try {
    const { username } = req.query;

    const user = await model.getUserFromUsername(username);

    const posts = await model.getUserUnpublishedPostsQuery(user.id);
    res.status(201).json(posts);
  } catch (error) {
    console.log(`error at getUserUnpublishedPosts(), ${error}`);
  }
}

async function createNewUnpublishedPost(req, res) {
  try {
    const { title, description, username } = req.body;

    const user = await model.getUserFromUsername(username);

    await model.createUnpublishedPostQuery(
      user.fullname,
      user.id,
      title,
      description
    );

    res.status(201).json({ message: "Save successful" });
  } catch (error) {
    console.log(`error at createNewUnpublishedPost(), ${error}`);
  }
}

async function deletePost(req, res) {
  try {
    const { postId } = req.query;
    const postIdInt = parseInt(postId);

    await model.deletePostQuery(postIdInt);

    res.status(201).json({ message: `Post ${postIdInt} successful` });
  } catch (error) {
    console.log(`error at deletePost(), ${error}`);
  }
}

async function deleteUnpublishedPost(req, res) {
  try {
    const { postId } = req.query;
    const postIdInt = parseInt(postId);

    await model.deleteUnpublishedPostQuery(postIdInt);

    res.status(201).json({ message: `Post ${postIdInt} successful` });
  } catch (error) {
    console.log(`error at deleteUnpublishedPost(), ${error}`);
  }
}

async function postUnpublishedPost(req, res) {
  try {
    const { postId } = req.query;
    const postIdInt = parseInt(postId);

    const post = await model.getPostFromPostId(postIdInt);

    await model.createPostQuery(
      post.name,
      post.userId,
      post.title,
      post.description
    );

    await model.deleteUnpublishedPostQuery(postIdInt);

    res.status(201).json({ message: `Publish successful` });
  } catch (error) {
    console.log(`error at postUnpublishedPost(), ${error}`);
  }
}

async function editPost(req, res) {
  try {
    // Because the response is sent weird ({"8":{"title":"ocmm","description":"ah"}}), how we extract the results is a bit different:
    const requestData = req.body;

    const postIdString = Object.keys(requestData)[0];
    const postId = parseInt(postIdString);

    const { title, description } = requestData[postId];

    await model.updatePostQuery(title, description, postId);

    res.status(201).json({ message: `post updated successfully` });
  } catch (error) {
    console.log(`error at editPost(), ${error}`);
  }
}

async function editUnpublishedPost(req, res) {
  try {
    // Because the response is sent weird ({"8":{"title":"ocmm","description":"ah"}}), how we extract the results is a bit different:
    const requestData = req.body;

    const postIdString = Object.keys(requestData)[0];
    const postId = parseInt(postIdString);

    const { title, description } = requestData[postId];

    await model.updateUnpublishedPostQuery(title, description, postId);

    res.status(201).json({ message: `post updated successfully` });
  } catch (error) {
    console.log(`error at editUnpublishedPost(), ${error}`);
  }
}

export default {
  signUp,
  verifyLogin,
  createNewPost,
  getPosts,
  getComments,
  postComment,
  getUserPosts,
  getUserUnpublishedPosts,
  createNewUnpublishedPost,
  deletePost,
  deleteUnpublishedPost,
  postUnpublishedPost,
  editPost,
  editUnpublishedPost,
};