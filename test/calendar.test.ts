import {academicYears} from "../src/period";

describe('Calendar Testing Suite', () => {
   it('AcademicYear should be an array', () => {
       expect(academicYears).toBeDefined();
   })
});
