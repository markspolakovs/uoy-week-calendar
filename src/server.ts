import express, { Request, Response } from "express";
import morgan from "morgan";
import { getCalendar } from "./calendar";
import { getFormattedString } from "./period";

export const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send(getFormattedString(new Date()));
});

app.get('/calendar', getCalendar);

app.listen(9000);
