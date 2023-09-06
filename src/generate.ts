import dayjs from "dayjs";
import {
  CalendarType,
  academicYears,
  getAcademicYear,
  getNextPeriod,
} from "./calendar";
import {
  ICalCalendar,
  ICalEventBusyStatus,
  ICalEventTransparency,
} from "ical-generator";
import hash from "hash.js";
import * as fs from "fs";

const today = dayjs().add(3, "hour");

if (!fs.existsSync("./src/public/calendar")) {
  fs.mkdirSync("./src/public/calendar", { recursive: true });
}

function getShortenedName(type: CalendarType): string {
  if (type == CalendarType.UNDERGRADUATE) {
    return "ug";
  } else if (type == CalendarType.POSTGRADUATE) {
    return "pg";
  } else if (type == CalendarType.STAFF) {
    return "staff";
  } else return "";
}

for (let calendarType of [
  CalendarType.UNDERGRADUATE,
  CalendarType.POSTGRADUATE,
  CalendarType.STAFF,
]) {
  const calendar = new ICalCalendar();

  let name = `UoY's Week Numbers (${getShortenedName(
    calendarType
  ).toUpperCase()})`;

  calendar.name(name);
  calendar.description(name);

  for (let academicYear of academicYears.slice(0, academicYears.length - 1)) {
    // Don't include the last academic year
    for (let currentPeriod of academicYear.periods) {
      let nextPeriod = getNextPeriod(currentPeriod, academicYear);

      let startDate = dayjs(currentPeriod.startDate).add(3, "hours");
      let endDate = dayjs(nextPeriod.startDate).subtract(1, "day");

      let weeks = endDate.diff(startDate, "weeks");

      for (let i = 0; i <= weeks; i++) {
        let currentDate = dayjs(startDate).add(i, "weeks").toDate();

        console.log(
          `[${getShortenedName(
            calendarType
          ).toUpperCase()}] - [${getAcademicYear(academicYear)}] - (${dayjs(
            currentDate
          ).format("DD MMM YY")}) ${currentPeriod.getWeekName(
            currentDate,
            calendarType
          )}`
        );

        calendar.createEvent({
          start: currentDate,
          end: currentDate,
          id: hash
            .sha256()
            .update(
              `${currentPeriod.getWeekName(
                currentDate,
                calendarType
              )}${currentDate}`
            )
            .digest("hex"),
          allDay: true,
          busystatus: ICalEventBusyStatus.FREE,
          transparency: ICalEventTransparency.TRANSPARENT,
          summary: currentPeriod.getWeekName(currentDate, calendarType),
        });
      }
    }
  }

  calendar
    .save(`./src/public/calendar/${calendarType as string}.ics`)
    .catch((err) => console.error(err));
  console.log(
    `Successfully generated calendar of type ${calendarType as string}`
  );
}
