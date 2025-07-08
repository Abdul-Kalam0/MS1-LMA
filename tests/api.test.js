// api.test.js
const request = require("supertest");
const app = require("../index");
const { User } = require("../models");

describe("API Endpoints", () => {
  it("should return 200 for creating a user", async () => {
    User.destroy({ where: { email: "john@gmail.com" } });
    const res = await request(app).post("/api/users").send({
      username: "john",
      email: "john@gmail.com",
    });

    expect(res.statusCode).toBe(200);
  });

  it("should return 200 for creating a user", async () => {
    User.destroy({ where: { email: "john@gmail.com" } });
    const res = await request(app).get(
      "/api/books/search?title=The Great Gatsby - Updated&author=F. Scott Fitzgerald"
    );

    //expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      books: {
        id: 1,
        title: "The Great Gatsby - Updated",
        author: "F. Scott Fitzgerald",
        genre: "Classic Fiction",
        publicationYear: 1925,
        createdAt: "2025-07-08T05:58:55.227Z",
        updatedAt: "2025-07-08T06:42:54.612Z",
      },
    });
  });
});
