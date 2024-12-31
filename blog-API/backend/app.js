import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import indexRouter from "./routes/indexRoutes.js";
import middleware from "./middleware/passport.js";

// import prisma from "./prisma.js";

const corsOptions = {
  origin: [
    "http://localhost:1000",
    "http://localhost:2000",
    "https://blogapifrontend1.vercel.app",
    "https://blogapifrontend2.vercel.app",
    "https://blogapifrontend1-9jsncee06-mrmarshal11s-projects.vercel.app",
  ],
};

dotenv.config();
const app = express();
const port = 8000;

middleware.usePassport(app);

app.use(express.json());
app.use(cors(corsOptions));

// app.get("/testdb", async (req, res) => {
//   try {
//     const result = await prisma.query("SELECT NOW() AS current_time");
//     res.json({ success: true, data: result.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

app.use("/", indexRouter);

app.listen(port, () => console.log(`server is running......`));