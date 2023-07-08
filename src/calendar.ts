import dayjs from "dayjs";

interface Period {
    readonly startDate: Date;
    readonly name: string;

    getWeekName(inputDate: Date): string;
    getWeekDescription(inputDate: Date, calendarType: CalendarType): string;
}

type AcademicYear = {
    periods: Period[];
}

export enum CalendarType {
    UNDERGRADUATE = 'undergraduate',
    POSTGRADUATE = 'postgraduate',
    STAFF = 'staff'
}

export class Term implements Period {
    readonly startDate: Date;
    readonly name: string;

    constructor(startDate: Date, type: string) {
        this.startDate = startDate;
        this.name = type;
    }

    public getWeekName(inputDate: Date): string {
        return `${this.name} Term Week ${getWeeksBetween(this.startDate, inputDate) + 1}`;
    }

    public getWeekDescription(inputDate: Date, calendarType: CalendarType): string {
        return "";
    }
}

export class Holiday implements Period {
    readonly startDate: Date;
    readonly name: string;

    constructor(startDate: Date, type: string) {
        this.startDate = startDate;
        this.name = type;
    }

    public getWeekName(inputDate: Date): string {
        return `${this.name} Vacation Week ${getWeeksBetween(this.startDate, inputDate) + 1}`;
    }

    public getWeekDescription(inputDate: Date, calendarType: CalendarType): string {
        return "";
    }
}

// Period between start and Christmas
export class Semester1A implements Period {
    readonly startDate: Date;
    readonly name: string;

    constructor(startDate: Date) {
        this.startDate = startDate;
        this.name = "Semester 1";
    }

    public getWeekName(inputDate: Date): string {
        let week = getWeeksBetween(this.startDate, inputDate) + 1;
        return `${this.name} Week ${week}`
    }

    public getWeekDescription(inputDate: Date, calendarType: CalendarType): string {
        let week = getWeeksBetween(this.startDate, inputDate) + 1;
        let description = "";

        if (calendarType == CalendarType.UNDERGRADUATE || calendarType == CalendarType.POSTGRADUATE) {
            if (week == 1) {
                description = `Freshers`
            } else if (week >= 2 && week <= 6) {
                description = `Teaching Week ${week - 1}`
            } else if (week == 7) {
                description = 'Consolidation Week'
            } else if (week >= 8 && week <= 13) {
                description = `Teaching Week ${week - 2}`
            }
        } else if(calendarType == CalendarType.STAFF) {
            if (week == 1) {
                description = `Open Week`
            } else if (week >= 2 && week <= 6) {
                description = `Teaching Week ${week - 1}}`
            } else if (week == 7) {
                description = 'Open Week'
            } else if (week >= 8 && week <= 13) {
                description = `Teaching Week ${week - 2}`
            }
        }

        return description;
    }
}

// Between Christmas and Semester 2 starting, normally 4 weeks long
export class Semester1B implements Period {
    readonly startDate: Date;
    readonly name: string;

    constructor(startDate: Date) {
        this.startDate = startDate;
        this.name = "Semester 1";
    }

    public getWeekName(inputDate: Date): string {
        let week = getWeeksBetween(this.startDate, inputDate) + 1;

        return `${this.name} Week ${week + 13}`;
    }

    public getWeekDescription(inputDate: Date, calendarType: CalendarType): string {
        let week = getWeeksBetween(this.startDate, inputDate) + 1;
        let description = "";

        if (calendarType == CalendarType.UNDERGRADUATE || calendarType == CalendarType.POSTGRADUATE) {
            if (week == 1) {
                description = "Revision Week"
            } else if (2 <= week && week <= 4) {
                description = `Assessment Week ${week - 1}`
            }
        } else if (calendarType == CalendarType.STAFF) {
            if (week <= 2) {
                description = `Open Week ${week}`
            } else {
                description = `Marking Week ${week - 2}`
            }
        }

        return description;
    }
}

// Start of Semester 2 up until Easter
export class Semester2A implements Period {
    readonly startDate: Date;
    readonly name: string;

    constructor(startDate: Date) {
        this.startDate = startDate
        this.name = "Semester 2";
    }

    getWeekName(inputDate: Date): string {
        let week = getWeeksBetween(this.startDate, inputDate) + 1;

        return `${this.name} Week ${week}`;
    }
    getWeekDescription(inputDate: Date, calendarType: CalendarType): string {
        let week = getWeeksBetween(this.startDate, inputDate) + 1;
        let description = "";
        
        if (calendarType == CalendarType.UNDERGRADUATE || calendarType == CalendarType.POSTGRADUATE) {
            if (week == 1) {
                description = "Refreshers Week";
            } else {
                description = `Teaching Week ${week - 1}`;
            }
        } else if (calendarType == CalendarType.STAFF) {
            if (week == 1) {
                description = "Marking Week 3"
            } else {
                description = `Teaching Week ${week - 1}`
            }
        }

        return description;
    }
}

// After Easter before Summer Vacation 
export class Semester2B implements Period {
    readonly startDate: Date;
    readonly name: string;
    readonly offset: number;

    constructor(startDate: Date, offset: number) {
        this.startDate = startDate
        this.name = "Semester 2";
        this.offset = offset;
    }
    
    getWeekName(inputDate: Date): string {
        let week = getWeeksBetween(this.startDate, inputDate) + this.offset;

        return `${this.name} Week ${week}`;
    }

    getWeekDescription(inputDate: Date, calendarType: CalendarType): string {
        let week = getWeeksBetween(this.startDate, inputDate) + this.offset;
        let description = "";

        if (calendarType == CalendarType.UNDERGRADUATE || calendarType == CalendarType.POSTGRADUATE) {
            if (week <= 12) {
                description = `Teaching Week ${week - 1}`;
            } else if (week == 13) {
                description = 'Revision Week'
            } else {
                description = `Assessment Week ${week - 13}`
            }
        } else if (calendarType == CalendarType.STAFF) {
            if (week <= 12) {
                description = `Teaching Week ${week - 1}`;
            } else if (week == 13 || week == 14) {
                description = `Open Week ${week - 12}`
            } else {
                description = `Marking Week ${week - 14}`
            }
        }

        return description;
    }
}


export class SemesterSummerVacation implements Period {
    readonly startDate: Date;
    readonly name: string;

    constructor(inputDate: Date) {
        this.startDate = inputDate;
        this.name = 'Summer';
    }

    public getWeekName(inputDate: Date): string {
        let week = getWeeksBetween(this.startDate, inputDate) + 1;
        return `${this.name} Vacation Week ${week}`
    }

    public getWeekDescription(inputDate: Date, calendarType: CalendarType): string {
        let week = getWeeksBetween(this.startDate, inputDate) + 1;
        let description = "";

        if (calendarType == CalendarType.UNDERGRADUATE) {
            if (week == 10 || week == 11) {
                description = `Resit Period`;
            }
        } else if (calendarType == CalendarType.POSTGRADUATE) {
            description = `Teaching Week ${week}`;

            if (week == 10 || week == 11) {
                description += ' (Resist Period)'
            }
        } else if (calendarType == CalendarType.STAFF) {
            if (week == 1) {
                description = 'Marking Week 3'; // staff term finishes one week into vacation period
            } else {
                description = `Open Week ${week - 1}`

                if (week == 4) {
                    description += ' / Board of Examiners'
                }
            }
        }

        return description;
    }
}

export const academicYears: AcademicYear[] = [
    {
        periods: [
            new Term(new Date(Date.UTC(2018, 8, 24)), "Autumn"),
            new Holiday(new Date(Date.UTC(2018, 11, 3)), "Christmas"),
            new Term(new Date(Date.UTC(2019, 0, 7)), "Spring"),
            new Holiday(new Date(Date.UTC(2019, 2, 18)), "Easter"),
            new Term(new Date(Date.UTC(2019, 3, 15)), "Summer"),
            new Holiday(new Date(Date.UTC(2019, 5, 24)), "Summer"),
        ]
    },
    {
        periods: [
            new Term(new Date(Date.UTC(2019, 8, 30)), "Autumn"),
            new Holiday(new Date(Date.UTC(2019, 11, 9)), "Christmas"),
            new Term(new Date(Date.UTC(2020, 0, 6)), "Spring"),
            new Holiday(new Date(Date.UTC(2020, 2, 16)), "Easter"),
            new Term(new Date(Date.UTC(2020, 3, 13)), "Summer"),
            new Holiday(new Date(Date.UTC(2020, 5, 22)), "Summer"),
        ]
    },
    {
        periods: [
            new Term(new Date(Date.UTC(2020, 8, 28)), "Autumn"),
            new Holiday(new Date(Date.UTC(2020, 11, 7)), "Christmas"),
            new Term(new Date(Date.UTC(2021, 0, 11)), "Spring"),
            new Holiday(new Date(Date.UTC(2021, 2, 22)), "Easter"),
            new Term(new Date(Date.UTC(2021, 3, 19)), "Summer"),
            new Holiday(new Date(Date.UTC(2021, 5, 28)), "Summer"),
        ]
    },
    {
        periods: [
            new Term(new Date(Date.UTC(2021, 8, 27)), "Autumn"),
            new Holiday(new Date(Date.UTC(2021, 11, 6)), "Christmas"),
            new Term(new Date(Date.UTC(2022, 0, 10)), "Spring"),
            new Holiday(new Date(Date.UTC(2022, 2, 21)), "Easter"),
            new Term(new Date(Date.UTC(2022, 3, 18)), "Summer"),
            new Holiday(new Date(Date.UTC(2022, 5, 27)), "Summer"),
        ]
    },
    {
        periods: [
            new Term(new Date(Date.UTC(2022, 8, 26)), "Autumn"),
            new Holiday(new Date(Date.UTC(2022, 11, 5)), "Christmas"),
            new Term(new Date(Date.UTC(2023, 0, 9)), "Spring"),
            new Holiday(new Date(Date.UTC(2023, 2, 20)), "Easter"),
            new Term(new Date(Date.UTC(2023, 3, 17)), "Summer"),
            new Holiday(new Date(Date.UTC(2023, 5, 26)), "Summer"),
        ]
    },
    {
        periods: [
            // 2023/24
            new Semester1A(new Date(Date.UTC(2023, 8, 18))),
            new Holiday(new Date(Date.UTC(2023, 11, 18)), "Christmas"),
            new Semester1B(new Date(Date.UTC(2024, 0, 8))),
            new Semester2A(new Date(Date.UTC(2024, 1, 5))),
            new Holiday(new Date(Date.UTC(2024, 2, 25)), "Easter"),
            new Semester2B(new Date(Date.UTC(2024, 3, 8)), 8),
            new SemesterSummerVacation(new Date(Date.UTC(2024, 5, 10))),
        ]
    },
    {
        periods: [
            // 2024/25
            new Semester1A(new Date(Date.UTC(2024, 8, 16))),
            new Holiday(new Date(2024, 11, 9), "Christmas"),
            new Semester1B(new Date(Date.UTC(2025, 0, 6))),
            new Semester2A(new Date(Date.UTC(2025,1,3))),
            new Holiday(new Date(Date.UTC(2025, 3, 7)), "Easter"),
            new Semester2B(new Date(Date.UTC(2025, 3, 21)), 10),
            new SemesterSummerVacation(new Date(Date.UTC(2025, 5, 9))),
        ]
    },
    {
        periods: [
            // 2025/26
            new Semester1A(new Date(Date.UTC(2025, 8, 15))),
            new Holiday(new Date(2025, 11, 15), "Christmas"),
            new Semester1B(new Date(Date.UTC(2026, 0, 5))),
            new Semester2A(new Date(Date.UTC(2026,1,2))),
            new Holiday(new Date(Date.UTC(2026, 2, 30)), "Easter"),
            new Semester2B(new Date(Date.UTC(2026, 3, 13)), 9),
            new SemesterSummerVacation(new Date(Date.UTC(2026, 5, 8))),
        ]
    },
    {
        periods: [
            // 2026/27
            new Semester1A(new Date(Date.UTC(2026, 8, 21))),
            new Holiday(new Date(2026, 11, 21), "Christmas"),
            new Semester1B(new Date(Date.UTC(2027, 0, 11))),
            new Semester2A(new Date(Date.UTC(2027,1,8))),
            new Holiday(new Date(Date.UTC(2027, 2, 22)), "Easter"),
            new Semester2B(new Date(Date.UTC(2027, 3, 12)), 7),
            new SemesterSummerVacation(new Date(Date.UTC(2027, 5, 14))),
        ]
    },
    {
        periods: [
            // 2027/28
            new Semester1A(new Date(Date.UTC(2027, 8, 20))),
            new Holiday(new Date(2027, 11, 20), "Christmas"),
            new Semester1B(new Date(Date.UTC(2028, 0, 10))),
            new Semester2A(new Date(Date.UTC(2028,1,7))),
            new Holiday(new Date(Date.UTC(2028, 3, 10)), "Easter"),
            new Semester2B(new Date(Date.UTC(2028, 3, 24)), 10),
            new SemesterSummerVacation(new Date(Date.UTC(2028, 5, 12))),
        ]
    },
    {
        periods: [
            // 2028/29
            new Semester1A(new Date(Date.UTC(2028, 8, 18))),
            new Holiday(new Date(2028, 11, 18), "Christmas"),
            new Semester1B(new Date(Date.UTC(2029, 0, 8))),
            new Semester2A(new Date(Date.UTC(2029,1,5))),
            new Holiday(new Date(Date.UTC(2029, 2, 26)), "Easter"),
            new Semester2B(new Date(Date.UTC(2029, 3, 9)), 8),
            new SemesterSummerVacation(new Date(Date.UTC(2029, 5, 11))),
        ]
    },
    {
        periods: [
            // 2029/30
            new Semester1A(new Date(Date.UTC(2029, 8, 17))),
            new Holiday(new Date(2029, 11, 17), "Christmas"),
            new Semester1B(new Date(Date.UTC(2030, 0, 7))),
            new Semester2A(new Date(Date.UTC(2030,1,4))),
            new Holiday(new Date(Date.UTC(2030, 3, 8)), "Easter"),
            new Semester2B(new Date(Date.UTC(2030, 3, 22)), 10),
            new SemesterSummerVacation(new Date(Date.UTC(2030, 5, 10))),
        ]
    }
];

export function getWeeksBetween(startDate: Date, endDate: Date): number {
    return Math.abs(dayjs(endDate).diff(dayjs(startDate), 'weeks'));
}

export function getAcademicYear(academicYear: AcademicYear): string {
    return `${academicYear.periods[0].startDate.getFullYear()}/${academicYear.periods.slice(-1)[0].startDate.getFullYear()}`
}

export function getNextPeriod(currentPeriod: Period, currentAcademicYear: AcademicYear): Period {
    let academicYearIndex = academicYears.indexOf(currentAcademicYear);
    let periodIndex = academicYears[academicYearIndex].periods.indexOf(currentPeriod);

    if (periodIndex < academicYears[academicYearIndex].periods.length - 1) {
        return academicYears[academicYearIndex].periods[periodIndex + 1];
    } else {
        return academicYears[academicYearIndex + 1].periods[0];
    }
}
