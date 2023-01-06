import { Request, Response, NextFunction } from "express";
import { ICalCalendar } from "ical-generator";
import {getCurrentAcademicYear, getNextPeriod} from "./period";
import dayjs from "dayjs";

const calendar = new ICalCalendar();

calendar.name("University of York's Week Numbers");

export async function getCalendar(req: Request, res: Response, next: NextFunction) {
    let academicYear = getCurrentAcademicYear(new Date());

    for(let currentPeriod of academicYear.periods) {
        let nextPeriod = getNextPeriod(currentPeriod, academicYear);

        let startDate = dayjs(currentPeriod.startDate).day(1);
        let endDate = dayjs(nextPeriod.startDate).subtract(1, 'day');

        let weeks = endDate.diff(startDate, 'weeks');

        for (let i = 0; i <= weeks; i++) {
            let currentDate = dayjs(startDate).add(i, 'weeks').toDate();

            console.log(`Adding ${currentPeriod.getFormattedString(currentDate)}`)

            calendar.createEvent({
                start: currentDate,
                end: currentDate,
                allDay: true,
                summary: currentPeriod.getFormattedString(currentDate)
            });
        }

    }

    calendar.serve(res);
}
