import express from "express";
import router from "./router";
import helmet from "helmet";

export const app = express();

// Middleware
app.use(helmet())

// Routes
app.use(router);
