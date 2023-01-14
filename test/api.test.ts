import supertest from "supertest";
import {app} from "../src/app";

describe('API Methods', () => {
    it('GET /api/pong should be 200', async () => {
        const response = await supertest(app).get('/api/ping')

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('pong');
    })
})
