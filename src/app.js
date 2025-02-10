import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const limit = process.env.LIMIT || "16kb";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: limit }));
app.use(express.urlencoded({ extended: true, limit: limit }));
app.use(express.static("public"))
app.use(cookieParser())

export { app };
