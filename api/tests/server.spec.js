const supertest = require("supertest");
const { app, server } = require("../server");
const { createStates } = require("./helpers/mockDbData");
const request = supertest(app);

const { connectDB, disconnectDB } = require("./helpers/basicSetup");

describe("API test", () => {
  let dbUrl = "";

  beforeAll(async () => {
    dbUrl = await connectDB();
  });

  afterAll(() => {
    disconnectDB();
    server.close();
  });

  describe("GET /states", () => {
    it("Should get all states", async () => {
      await createStates();
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY0NTM3NDQxNSwiZXhwIjoxNzA4NDg5NjE1fQ.5a4aUBzrUsVc3xyqLcZTYf3Mq8eNY2o6_XoX4NUmSFs";
      const res = await request.get("/states").set("Cookie", `token=${token};`);
      console.log("response is : " + JSON.stringify(res));
      expect(res.status).toBe(200);
    });
  });

  describe("POST /api/authenticate", () => {
    it("Should get the authentication token", async () => {
      const adminUserDetails = {
        email: "admin@gmail.com",
        password: "admin",
        role: "ADMIN",
      };
      const res = await request
        .post("/api/authenticate")
        .send(adminUserDetails);
      console.log("response is : " + JSON.stringify(res));
      expect(res.status).toBe(200);
    });
  });

  describe("POST /tax-accountant/register", () => {
    it("Should register tax accountant with admin token", async () => {
      const userCreationRequest = {
        name: "ac1",
        email: "ac1@gmail.com",
        role: "TAX_ACCOUNTANT",
        taxPayerIds: [],
        stateId: "goa",
        panNumber: "EOZPP1234l",
        password: "ac1",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY0NTM3NDQxNSwiZXhwIjoxNzA4NDg5NjE1fQ.5a4aUBzrUsVc3xyqLcZTYf3Mq8eNY2o6_XoX4NUmSFs";

      const res = await request
        .post("/tax-accountant/register")
        .set("Cookie", `token=${token};`)
        .send(userCreationRequest);
      console.log("response is : " + JSON.stringify(res));
      expect(res.status).toBe(200);
    });
  });

  describe("POST /tax-accountant/register", () => {
    it("Should not register tax accountant for invalid admin token", async () => {
      const userCreationRequest = {
        name: "ac1",
        email: "ac1@gmail.com",
        role: "TAX_ACCOUNTANT",
        taxPayerIds: [],
        stateId: "goa",
        panNumber: "EOZPP1234l",
        password: "ac1",
      };
      const token = "invalid token";

      const res = await request
        .post("/tax-accountant/register")
        .set("Cookie", `token=${token};`)
        .send(userCreationRequest);
      console.log("response is : " + JSON.stringify(res));
      expect(res.status).toBe(500);
    });
  });

  describe("POST /tax-accountant/register", () => {
    it("Should register tax payer with tax accountant token", async () => {
      const userCreationRequest = {
        name: "tp1",
        email: "tp1@gmail.com",
        role: "TAX_PAYER",
        taxPayerIds: [],
        stateId: "goa",
        panNumber: "EOZPP1234l",
        password: "tp1",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjMUBnbWFpbC5jb20iLCJpYXQiOjE2NDUzNzQ2MjUsImV4cCI6MTcwODQ4OTgyNX0.jIvxBJO4wGRW86D0oPmv9Eh4ED-IVTOpVypX7t0BtGs";

      const res = await request
        .post("/tax-payer/register")
        .set("Cookie", `token=${token};`)
        .send(userCreationRequest);
      console.log("response is : " + JSON.stringify(res));
      expect(res.status).toBe(200);
    });
  });

  describe("GET /taxPayers", () => {
    it("Should get tax payers with tax accountant token", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjMUBnbWFpbC5jb20iLCJpYXQiOjE2NDUzNzQ2MjUsImV4cCI6MTcwODQ4OTgyNX0.jIvxBJO4wGRW86D0oPmv9Eh4ED-IVTOpVypX7t0BtGs";

      const res = await request
        .get("/taxPayers")
        .set("Cookie", `token=${token};`);
      console.log("response is : " + JSON.stringify(res));
      expect(res.status).toBe(200);
    });
  });

  describe("POST /tax-accountant/register", () => {
    it("Should get tax accountants with admin token", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY0NTM3NDQxNSwiZXhwIjoxNzA4NDg5NjE1fQ.5a4aUBzrUsVc3xyqLcZTYf3Mq8eNY2o6_XoX4NUmSFs";

      const res = await request
        .get("/taxAccountants")
        .set("Cookie", `token=${token};`);
      console.log("response is : " + JSON.stringify(res));
      expect(res.status).toBe(200);
    });
  });

  describe("POST /tax-accountant/register", () => {
    it("Should add tax entry for tax payer with valid tax accountant token", async () => {
      let taxEntryRequest = {
        taxPayerId: "tp1@gmail.com",
        taxableAmount: 12000,
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjMUBnbWFpbC5jb20iLCJpYXQiOjE2NDUzNzQ2MjUsImV4cCI6MTcwODQ4OTgyNX0.jIvxBJO4wGRW86D0oPmv9Eh4ED-IVTOpVypX7t0BtGs";

      const res = await request
        .post("/taxEntry")
        .set("Cookie", `token=${token};`)
        .send(taxEntryRequest);
      expect(res.status).toBe(200);
    });
  });

  describe("POST /tax-accountant/register", () => {
    it("Should get tax entry for tax payer", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjMUBnbWFpbC5jb20iLCJpYXQiOjE2NDUzNzQ2MjUsImV4cCI6MTcwODQ4OTgyNX0.jIvxBJO4wGRW86D0oPmv9Eh4ED-IVTOpVypX7t0BtGs";

      const res = await request
        .get("/taxEntries")
        .set("Cookie", `token=${token};`);
      expect(res.status).toBe(200);
      expect(res.body[0].taxPayerId).toBe("tp1@gmail.com");
      expect(res.body[0].taxableAmount).toBe(12000);
      expect(res.body[0].totalTax).toBe(720);
      expect(res.body[0].status).toBe("OVER_DUE");
    });
  });
});
