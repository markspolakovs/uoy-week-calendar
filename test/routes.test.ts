import supertest from "supertest";
import {app} from "../src/app";

describe('Test Express Routes', () => {
    test('GET /', async () => {
       await supertest(app).get('/')
           .expect(200)
           .then(res => {
               expect(res.body).toBeDefined();
           })
    });
})
