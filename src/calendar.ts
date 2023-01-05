import { Request, Response, NextFunction } from "express";
import ical, { ICalCalendar } from "ical-generator";
import { getCurrentPeriod, getEndOfPeriod, getFormattedString, getWeeksBetween } from "./period";

const calendar = new ICalCalendar();

calendar.name("University of York's Week Numbers");
calendar.description("Providing you with what week we are in."); // todo change this

export async function getCalendar(req: Request, res: Response, next: NextFunction) {
    const startDate = getCurrentPeriod(new Date()).startDate;
    const endDate = getEndOfPeriod(new Date());

    console.log(`${startDate} - ${endDate} - ${getWeeksBetween(startDate, endDate)}`);

    for(let i = 0; i < getWeeksBetween(startDate, endDate); i++) {
        let currentDate = new Date(startDate.setDate(startDate.getDate() + i * 7));

        console.log(`${getFormattedString(currentDate)}`);

        calendar.createEvent({
            start: currentDate,
            end: currentDate,
            allDay: true,
            summary: getFormattedString(currentDate)
        });
    }

    return calendar.serve(res);
}
