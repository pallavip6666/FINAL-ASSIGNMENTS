import { matchedData, validationResult } from "express-validator";
import db from "../db/queries.js";
import bcrypt from "bcryptjs";

// GET /sign-up -> sign up form
function signupGet(req, res) {
    res.render("sign-up");
}

// POST /sign-up -> enter into the DB
async function signupPost (req, res, next) {
    // save any errors from validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let details = "";
        errors.array().map(error => details = details + error.msg + " ");

        const error = new Error();
        error.status = 400;
        error.details = details;
        
        return next(error)
    }

    // save data if there are no errors -> data.firstName, data.lastName,...
    const data = matchedData(req);

    // encrypt passwords
    try {
        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password1, saltRounds);
    } catch (error) {
        return next(error);
    }

    // inserting data into DB
    await db.insertUser(data);

    res.redirect("/log-in");
};

export default {
    signupGet,
    signupPost,
};