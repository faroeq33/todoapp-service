import request from 'supertest';
import app from '../src/app';

describe('GET /api/v1 welcome', () => {
	it('responds with a welcome message', (done) => {
		request(app)
			.get('/api/v1/welcome')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, {
				message: 'Welcome to the todoapp service',
			}, done);
	});
});

