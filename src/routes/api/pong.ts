import {Request, Response, NextFunction} from "express";
import dayjs from "dayjs";

export default function getPong(req: Request, res: Response, next: NextFunction) {
    res.json({
        "pong": dayjs()
    })
}
