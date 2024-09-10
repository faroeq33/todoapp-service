import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app)

describe("Authentication routes", () => {
	it("POST /api/v1/auth/register", (done) => {
		request
			.post("/api/v1/auth/register")
			.expect("Content-Type", /json/)
			.send({
				email: "testuser@test.com",
				username: "testuser",
				password: "testpassword"
			})
			.expect(201)
			.expect((res) => {
				return res.body.message === "Account has been created";
			})
			.end((err, res) => {
				console.log("error body", res.body)
				if (err) return done(err);
				return done();
			});
	});
});