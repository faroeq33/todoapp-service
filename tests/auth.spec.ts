import app from '../src/app';
// import * as mockDb from './mockdb'
import supertest from 'supertest'

const request = supertest(app)

describe('Test request with mongoose', () => {
	// beforeAll(async () => {
	// 	await mockDb.connect()
	// });

	// afterEach(async () => {
	// 	await mockDb.clearDatabase()
	// });

	// afterAll(async () => {
	// 	await mockDb.closeDatabase()
	// });

	test('GET - /', async () => {
		const res = await request.get('/api/v1/welcome').send();
		const body = res.body;
		const message = body.message;
		expect(res.statusCode).toBe(200);
		expect(message).toBe('Welcome to the todoapp service');
	});
})