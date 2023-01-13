import express from "express";
import router from "./routes/router";
import morgan from "morgan";

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/', express.static('public'))

app.use('/', router);
