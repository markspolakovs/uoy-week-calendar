import {
    academicYears,
    CalendarType,
    getAcademicYear,
    getCurrentAcademicYear,
    getNextPeriod,
    getWeeksBetween,
    Holiday,
    SemesterOne,
    Term,
} from "../src/calendar";

import dayjs from "dayjs";

describe('Calendar Testing Suite', () => {
    it('AcademicYear should be an array', () => {
        expect(academicYears).toBeDefined();
    });

    it('AcademicYear should contain at least one element', () => {
        expect(academicYears.length).toBeGreaterThanOrEqual(1);
    });
});

describe('Calendar Testing Suite (Utility Methods)', () => {
    it('getWeeksBetween', () => {
       expect(getWeeksBetween(dayjs().toDate(), dayjs().toDate())).toBe(0); //
       expect(getWeeksBetween(dayjs().toDate(), dayjs().add(3, 'day').toDate())).toBe(0);
       expect(getWeeksBetween(dayjs().toDate(), dayjs().add(8, 'weeks').toDate())).toBe(8);
    });

    it('getCurrentAcademicYear', () => {
        expect(getCurrentAcademicYear(new Date())).toBeDefined();
        expect(getCurrentAcademicYear(new Date()).periods).toBeDefined();
    });

    it('getNextPeriod within same year', () => {
        let currentPeriod = academicYears[0].periods[0];
        expect(getNextPeriod(currentPeriod, academicYears[0])).toBe(academicYears[0].periods[1]);
    });

    it('getNextPeriod at end of year', () => {
        let endPeriod = academicYears[2].periods.slice(-1)[0];

        expect(getNextPeriod(endPeriod, academicYears[2])).toBe(academicYears[3].periods[0]);
    });

    it('should provide a user friendly string', () => {
        for(let academicYear of academicYears) {
            expect(getAcademicYear(academicYear)).toMatch(/[0-9]{4}\/[0-9]{4}/);
        }
    });
});

describe('Period Class Specific Methods', () => {
    it('Term', () => {
        let today = dayjs();

        let exampleTerm = new Term(dayjs().toDate(), 'Autumn');

        expect(exampleTerm.getWeekName(today.toDate())).toBeDefined();
        expect(exampleTerm.getWeekName(today.toDate())).toBe('Autumn Term Week 1');
        expect(exampleTerm.getWeekName(today.add(3, 'weeks').add(4, 'hours').toDate())).toBe('Autumn Term Week 4');
    });

    it('Holiday', () => {
        let today = dayjs();

        let exampleHoliday = new Holiday(today.toDate(), 'Test')
        expect(exampleHoliday).toBeDefined();
        expect(exampleHoliday.getWeekName(today.toDate())).toBe('Test Vacation Week 1')
    })
});

describe('Semester One', function () {
    let today = dayjs();

    let semesterOne = new SemesterOne(today.toDate());

    it('should return Semester 1 as type', () => {
        expect(semesterOne.type).toBe('Semester 1');
    });

    it('should return the same start date', () => {
        expect(semesterOne.startDate).toEqual(today.toDate());
    });

    it('week 1 should be correct type', () => {
        expect(semesterOne.getWeekDescription(today.toDate(), CalendarType.UNDERGRADUATE)).toBe('Freshers');
        expect(semesterOne.getWeekDescription(today.toDate(), CalendarType.POSTGRADUATE)).toBe('Freshers');
        expect(semesterOne.getWeekDescription(today.toDate(), CalendarType.STAFF)).toBe('Open Week');
    })
});
