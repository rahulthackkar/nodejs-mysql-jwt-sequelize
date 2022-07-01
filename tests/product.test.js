const request = require("supertest");
const app = require("../app.js");
/*
 * declare the token variable in a scope accessible
 * by the entire test suite
 */
let token, productId;

beforeAll(async () => {
  const response = await request(app)
    .post("/api/auth/signin")
    .set("Content-Type", `application/json`)
    .send({
      username: "admin",
      password: "password",
    });
  token = response.body.accessToken;
});
describe("Product API", () => {
  it("Should return 403 as no token passed", async () => {
    const res = await request(app).get("/product");
    expect(res.statusCode).toEqual(403);
  });
  it("should create a new product", async () => {
    const res = await request(app)
      .post("/product")
      .set("x-access-token", `${token}`)
      .set("Content-Type", `application/json`)
      .send({ name: "Business Cards", price: 100 });
    expect(res.statusCode).toEqual(201);
    productId = res.body.id;
  });
  it("Should List All The Products", async () => {
    const res = await request(app)
      .get("/product")
      .set("x-access-token", `${token}`)
      .set("Content-Type", `application/json`);
    expect(res.statusCode).toEqual(200);
  });
  it("should update a product", async () => {
    const res = await request(app)
      .put("/product/" + productId)
      .set("x-access-token", `${token}`)
      .set("Content-Type", `application/json`)
      .send({ name: "Business Cards Updated", price: 200 });
    expect(res.statusCode).toEqual(200);
  }),
    it("should delete a product", async () => {
      const res = await request(app)
        .del("/product/" + productId)
        .set("x-access-token", `${token}`)
        .set("Content-Type", `application/json`);
      expect(res.statusCode).toEqual(200);
    });
});
