import express from "express";
import router from "./routes/router";
import helmet from "helmet";

export const app = express();

app.use(helmet())
app.use(express.json());
app.use('/', express.static('public'))

app.use('/', router);
