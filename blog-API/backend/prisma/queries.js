import prisma from "./prisma.js";

async function createUserQuery(username, fullname, hashedPassword) {
  try {
    const newUser = await prisma.users.create({
      data: {
        fullname: fullname,
        username: username,
        password: hashedPassword,
      },
    });
    console.log(`successfully created user: ${username}`);
  } catch (error) {
    console.log(`error at createUserQuery(), ${error}`);
  }
}

async function getUserFromUsername(username) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error) {
    console.log(`error at getFromUsername(), ${error}`);
  }
}

async function createPostQuery(name, userId, title, description) {
  try {
    await prisma.posts.create({
      data: {
        name: name,
        userId: userId,
        title: title,
        description: description,
      },
    });

    console.log(`successfully created post: ${title}`);
  } catch (error) {
    console.log(`error at createPostQuery(), ${error}`);
  }
}

async function getPostsQuery() {
  try {
    const posts = await prisma.posts.findMany();
    return posts;
  } catch (error) {
    console.log(`error at getPostsQuery(), ${error}`);
  }
}

async function getCommentsQuery(postId) {
  try {
    const comments = await prisma.comments.findMany({
      where: {
        postId: postId,
      },
    });
    return comments;
  } catch (error) {
    console.log(`error at getCommentsQuery(), ${error}`);
  }
}

async function newCommentQuery(name, comment, postId) {
  try {
    await prisma.comments.create({
      data: {
        name: name,
        description: comment,
        postId: postId,
      },
    });

    console.log(`successfully created comment`);
  } catch (error) {
    console.log(`error at newCommentQuery(), ${error}`);
  }
}

// Frontend2 queries below:
async function getUserPostsQuery(userId) {
  try {
    const posts = await prisma.posts.findMany({
      where: {
        userId: userId,
      },
    });
    return posts;
  } catch (error) {
    console.log(`error at getUserPostsQuery(), ${error}`);
  }
}

async function getUserUnpublishedPostsQuery(userId) {
  try {
    const posts = await prisma.unpublishedPosts.findMany({
      where: {
        userId: userId,
      },
    });
    return posts;
  } catch (error) {
    console.log(`error at getUserUnpublishedPostsQuery(), ${error}`);
  }
}

async function createUnpublishedPostQuery(name, userId, title, description) {
  try {
    await prisma.unpublishedPosts.create({
      data: {
        name: name,
        userId: userId,
        title: title,
        description: description,
      },
    });

    console.log(`successfully saved post: ${title}`);
  } catch (error) {
    console.log(`error at createUnpublishedPostQuery(), ${error}`);
  }
}
async function deletePostQuery(postId) {
  try {
    await prisma.posts.delete({
      where: {
        id: postId,
      },
    });

    console.log(`successfully deleted post: ${postId}`);
  } catch (error) {
    console.log(`error at deletePostQuery(), ${error}`);
  }
}

async function deleteUnpublishedPostQuery(postId) {
  try {
    await prisma.unpublishedPosts.delete({
      where: {
        id: postId,
      },
    });

    console.log(`successfully deleted post: ${postId}`);
  } catch (error) {
    console.log(`error at deleteUnpublishedPostQuery(), ${error}`);
  }
}

async function getPostFromPostId(postId) {
  try {
    const post = await prisma.unpublishedPosts.findFirst({
      where: {
        id: postId,
      },
    });

    console.log(`found post: ${postId}`);
    return post;
  } catch (error) {
    console.log(`error at getPostFromPostId(), ${error}`);
  }
}

async function updatePostQuery(title, description, postId) {
  try {
    await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        description: description,
      },
    });

    console.log(`updated post: ${postId}`);
  } catch (error) {
    console.log(`error at updatePostQuery(), ${error}`);
  }
}

async function updateUnpublishedPostQuery(title, description, postId) {
  try {
    await prisma.unpublishedPosts.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        description: description,
      },
    });

    console.log(`updated post: ${postId}`);
  } catch (error) {
    console.log(`error at updateUnpublishedPostQuery(), ${error}`);
  }
}

export default {
  createUserQuery,
  getUserFromUsername,
  createPostQuery,
  getPostsQuery,
  getCommentsQuery,
  newCommentQuery,
  getUserPostsQuery,
  getUserUnpublishedPostsQuery,
  createUnpublishedPostQuery,
  deletePostQuery,
  deleteUnpublishedPostQuery,
  getPostFromPostId,
  updatePostQuery,
  updateUnpublishedPostQuery,
};