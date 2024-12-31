import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

dotenv.config();

function usePassport(app) {
  // Check username & password match after user inputs login details
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("Logging in user:", username); // Log the username
        const user = await prisma.users.findUnique({
          where: {
            username: username,
          },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          console.log("passwords do not match!");
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
}

function generateToken(user) {
  // Encode any user info you need. For example: { id: user.id, name: user.username }
  return jwt.sign(
    { id: user.id, name: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

// Middleware to protect routes using JWT verification
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // user payload is now available in req.user
    next();
  });
}

export default { usePassport, generateToken, authenticateToken };