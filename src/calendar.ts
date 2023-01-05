import { Request, Response, NextFunction } from "express";
import { ICalCalendar } from "ical-generator";
import dayjs from "dayjs";

const calendar = new ICalCalendar();

calendar.name("University of York's Week Numbers");

export async function getCalendar(req: Request, res: Response, next: NextFunction) {
    return calendar.serve(res);
}
