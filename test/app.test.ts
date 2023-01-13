import supertest from "supertest";
import {app} from '../src/app';

describe('Test the root path', () => {
    test('GET /', async () => {
        const response = await supertest(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    })
})

describe('Test the calendar path', () => {
   test('GET /calendar', async () => {
       const response = await supertest(app).get('/calendar');

       console.log(response);

       expect(response.headers).toBeDefined()
   })
});

