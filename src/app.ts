import express from "express";
import router from "./routes/router";
import morgan from "morgan";

export const app = express();
export const port = process.env.PORT ?? 9000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/', router);

app.listen(port);

