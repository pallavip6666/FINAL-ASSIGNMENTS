import db from "../db/queries.js";
import dotenv from "dotenv";

dotenv.config();

// GET /become-admin -> form
function becomeAdminGet(req, res, next) {
    res.render("become-admin", {
        success: null,
        message: null
    });
}

// POST /become-admin -> check passcode and change admin status in DB
async function becomeAdminPost(req, res, next) {
    const secret = req.body.secret;

    if (secret === process.env.ADMIN_SECRET) {
        // assign membership status
        try {
            await db.assignAdmin(req.user);
        } catch (error) {
            return next(error);
        }

        res.render("become-admin", {
            success: true,
            message: "You are now an admin of the Clubhouse."
        });
    } else {
        // passcode is not correct
        res.render("become-admin", {
            success: false,
            message: "Secret is incorrect. Guess you are not a great fit to be admin."
        });
    }    
}

export default {
    becomeAdminGet,
    becomeAdminPost
}