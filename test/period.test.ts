import {academicYears, getAcademicYear, getCurrentAcademicYear, getNextPeriod} from "../src/period";

describe('Calendar Testing Suite', () => {
    it('AcademicYear should be an array', () => {
        expect(academicYears).toBeDefined();
    });
});

describe('Calendar Testing Suite (Utility Methods)', () => {
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
