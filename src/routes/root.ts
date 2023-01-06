import {NextFunction, Request, Response} from "express";

export default function getIndex(req: Request, res: Response, next: NextFunction) {
    res.send('Hello, World');
}
