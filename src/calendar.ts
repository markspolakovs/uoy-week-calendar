import { Request, Response, NextFunction } from "express";
import { ICalCalendar } from "ical-generator";

const calendar = new ICalCalendar();

calendar.name("University of York's Week Numbers");
calendar.createEvent({
    start: new Date(),
    end: new Date(),
    allDay: true,
    summary: 'My first event'
})

export async function getCalendar(req: Request, res: Response, next: NextFunction) {
    return calendar.serve(res);
}
