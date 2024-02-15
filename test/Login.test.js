const { login } = require("../controllers/authControllers");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { validateBody } = require("../middlewares");
const { schemas } = require("../models/user");
const express = require("express");
const request = require("supertest");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.post("/api/auth/login", validateBody(schemas.loginSchema), login);

describe("Test login Function", () => {
  beforeAll(() => app.listen(3000));

  test("login returns user object and token", async () => {
    const userData = { email: "Balambino@gmail.com", password: "11111111" };
    const response = await request(app).post("/api/auth/login").send(userData);
    const { user, token } = response.body;
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof token).toBe("string");
  }, 20000);
});
