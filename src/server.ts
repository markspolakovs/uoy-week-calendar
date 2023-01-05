import express, { Request, Response } from "express";
import morgan from "morgan";
import { getCalendar } from "./calendar";

export const app = express();
export const port = process.env.PORT ?? 9000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send({'hello': 'world'});
});

app.get('/calendar', getCalendar);

app.listen(port);
console.log(`App running on port ${port}`);
