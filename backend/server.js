/* main file where express is intialized and server is started */

import path from "path";
// import "express" to be able to use express
import express from "express";

// import dotenv and call "dotenv.config()" to connect to .env file and use variables from it
import dotenv from "dotenv";
dotenv.config();

// allows us to use cookies for security
import cookieParser from "cookie-parser";
// import to use custom error handler functions created by us
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// import function we created to initialize and connect to MongoDB
import connectDB from "./config/db.js";

// port specified in .env file or port 5000
const port = process.env.PORT || 5000;

// import all the routes speified in the userRoutes file
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uses cookies to protect routes (you have to be logged in to access certain routes)
app.use(cookieParser());

// routes are activated and will branch off from "/api/users"
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  // root set and broadcasts that server is ready
  app.get("/", (req, res) => res.send("Server is ready"));
}

// middleware placed at bottom so that only used if an error is encountered.
app.use(notFound);
app.use(errorHandler);

// specifies port that is accessed
app.listen(port, () => console.log(`Server started on port ${port}`));
