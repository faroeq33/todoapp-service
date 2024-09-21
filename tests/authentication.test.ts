import supertest from "supertest";
import { app } from "../src/app";

/*
 * This this is intended to test this RESTAPI service from the clients perspective.
 * So it should not care which database it's using, or how the service is implemented.
 * It should only care about the API contract.
 */

const request = supertest(app);

describe("Authentication API", () => {
  const testUser = {
    username: "testuser",
    password: "password",
    email: "test@test.com",
  };

  const baseRoute = "/api/v1/auth";

  describe(`POST ${baseRoute}/register`, () => {
    it("should return 400 if email is missing", async () => {
      const testData = {
        username: testUser.username,
        password: testUser.password,
      };

      const response = await request
        .post(`${baseRoute}/register`)
        .send(testData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Missing email, password or username fields. Check if you have any typos"
      );
    });

    it("should return 400 if username is missing", async () => {
      const response = await request.post(`${baseRoute}/register`).send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });

    it("should return 400 if password is missing", async () => {
      const response = await request.post(`${baseRoute}/register`).send({
        email: testUser.email,
        username: testUser.username,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });

    it("should return 201 if user is created successfully", async () => {
      const response = await request
        .post(`${baseRoute}/register`)
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message");
    });

    it("should return 400 if user already exists", async () => {
      const response = await request
        .post(`${baseRoute}/register`)
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe(`POST ${baseRoute}/login`, () => {
    async function requestPostLogin(body: object) {
      const response = await request.post(`${baseRoute}/login`).send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    }

    it("should return 400 if email is missing", async () => {
      // Without `await`, I get ERRCONNRESET, so I added it
      await requestPostLogin({
        username: "testuser",
        password: testUser.password,
      });
    });

    it("should return 400 if password is missing", async () => {
      await requestPostLogin({
        email: "test@test.com",
        username: testUser.username,
      });
    });

    it("should return 400 if username is missing", async () => {
      await requestPostLogin({
        username: "testuser",
        email: testUser.email,
      });
    });

    it("should return token if user is logged in successfully", async () => {
      const response = await request.post(`${baseRoute}/login`).send({
        username: "testuser",
        password: "password",
        email: "test@test.com",
      });

      expect(response.ok).toBeTruthy();
      expect(response.body).toHaveProperty("token");
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request.post(`${baseRoute}/login`).send({
        username: "nonexistentuser",
        password: "nonexistentpassword",
        email: "non@existent.email",
      });

      expect(response.statusCode).toBe(404);
      expect(response.ok).toBeFalsy();
    });
  });
});
