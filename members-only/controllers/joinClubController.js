import db from "../db/queries.js";
import dotenv from "dotenv";

dotenv.config();

// GET /join-club -> displays form for secret message
function joinClubGet(req, res, next) {
    res.render("join-club", {
        success: null,
        message: null
    });
}

// POST /join-club -> check the input & change membership status
async function joinClubPost(req, res, next) {
    const secret = req.body.secret;

    if (secret === process.env.SECRET) {
        // change membership status to "true"
        if (!req.user.membership) {
            try {
                await db.assignMembership(req.user);
            } catch (error) {
                return next(error);
            }
        }

        res.render("join-club", { 
            success: true,
            message: "Congratulations! You have become a member of Clubhouse." 
        });
    } else {
        // display message that the secret is not correct
        res.render("join-club", { 
            success: false,
            message: "Bummer! Secret is not correct, try again."
        });
    }
}

export default {
    joinClubGet,
    joinClubPost
}