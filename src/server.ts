import express, { Request, Response } from "express";
import morgan from "morgan";
import { getCalendar } from "./calendar";

export const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send({'hello': 'world'});
});

app.get('/calendar', getCalendar);

app.listen(9000);
console.log(`App running on port 9000`);
