import db from "../db/queries.js";

// GET /messages -> displays all the messages from database
async function messagesGet(req, res) {
    const messages = await db.getAllMessagesOrderedDesc();
    res.render("messages", { messages });
}

// GET /messages/new -> displays form for message
function newMessageGet(req, res) {
    res.render("new-message-form");
}

// POST /messages/new -> saves message to database
async function newMessagePost(req, res) {
    // prepare data to be inserted
    const date = new Date();
    const message = {
        title: req.body.title,
        text: req.body.message,
        timestamp: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        user_id: req.user.id
    }

    await db.insertMessage(message);

    res.redirect("/messages");
}

// POST /messages/delete/:messageId -> deletes a message from DB
async function deleteMessagePost(req, res, next) {
    const messageId = req.params.messageId;
    try {
        await db.deleteMessage(messageId);
    } catch (error) {
        return next(error);
    }

    res.redirect("/messages");
}

export default {
    messagesGet,
    newMessageGet,
    newMessagePost,
    deleteMessagePost,
}