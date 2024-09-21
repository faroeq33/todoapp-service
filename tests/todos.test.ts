import supertest from "supertest";
import app from "../src/app";

/*
 * This test is intended to test this RESTAPI service from the clients perspective.
 * So it should not care which database it's using, or how the service is implemented.
 * It should only care about the API contract.
 */

/*
As a user, I want to be able to create a todo list
As a user, I want to be able to read a todo list
As a user, I want to be able to update a todo list
As a user, I want to be able to delete a todo list
 TODO: Show all todolists GET all todos /todolists?limit=10&skip=0
 TODO: Show 1 todolist /todolist/:id
 TODO: create todolist POST /todolist
 TODO: update todolist PUT /todolist/:id
 TODO: delete todolist DELETE /todolist/:id
*/
const request = supertest(app);

describe("TODOs resource API", () => {
  describe(`GET /api/v1/todos`, () => {
    it("should return unauthorised error, when not providing credentials", async () => {
      // Arrange

      // Act
      const response = await request.get(`/api/v1/todos`);

      // Assert
      expect(response.statusCode).toBe(401);
      expect(response.unauthorized).toBeTruthy();
    });
  });
});
