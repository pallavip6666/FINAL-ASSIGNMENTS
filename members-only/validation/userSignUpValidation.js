import { body } from "express-validator";
import db from "../db/queries.js";

// validation requirements
const signUpValidation = [
    body("firstName")
        .trim()
        .notEmpty()
        .isAlpha().withMessage(`First name must only contain letters`),
    body("lastName")
        .trim()
        .notEmpty()
        .isAlpha().withMessage("Last name must only contain letters"),
    body("email")
        .trim()
        .notEmpty()
        .custom(async email => {
            const user = await db.findUserEmail(email);
            if (user.length !== 0) throw new Error("User with this email already exists.");
        })
        .isEmail().withMessage(`Email is not the correct format. Enter it like so: example@mail.com`),
    body("username")
        .trim()
        .notEmpty()
        .custom(async username => {
        const user = await db.findUsername(username);
        if (user.length !== 0) throw new Error("Username is already taken.");
    }),
    body("password1")
        .trim()
        .notEmpty()
        .isLength({ min: 8 }).withMessage("Password is too short, minimum of 8 characters are required")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[\W_]/).withMessage("Password must contain at least one special character (#, $, !,...)"),
    body("password2")
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password1) {
                throw new Error("Passwords don't match!");
            }
            return true;
    })
];

export default signUpValidation;