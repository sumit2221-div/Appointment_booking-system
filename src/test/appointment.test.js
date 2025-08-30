import request from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";
import User from "../model/User.model.js";
import Availability from "../model/Availability.model.js";
import Appointment from "../model/Appointment.model.js";

let student1Token, student2Token, professorToken;
let professorId, availabilityId1, availabilityId2, appointmentId1, appointmentId2;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany();
  await Availability.deleteMany();
  await Appointment.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("End-to-End Appointment Flow", () => {
  it("registers a professor (Dr. Amit Sharma)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Dr. Amit Sharma",
      email: "amit.sharma@example.com",
      password: "Password123",
      role: "professor",
    });
    expect(res.statusCode).toBe(201);
  });

  it("registers student A1 (Riya Patel)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Riya Patel",
      email: "riya.patel@example.com",
      password: "Password123",
      role: "student",
    });
    expect(res.statusCode).toBe(201);
  });

  it("registers student A2 (Arjun Mehta)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Arjun Mehta",
      email: "arjun.mehta@example.com",
      password: "Password123",
      role: "student",
    });
    expect(res.statusCode).toBe(201);
  });

  it("logs in professor", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "amit.sharma@example.com",
      password: "Password123",
    });
    expect(res.statusCode).toBe(200);
    professorToken = res.body.token;
    professorId = res.body.user._id;
  });

  it("logs in student A1", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "riya.patel@example.com",
      password: "Password123",
    });
    expect(res.statusCode).toBe(200);
    student1Token = res.body.token;
  });

  it("logs in student A2", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "arjun.mehta@example.com",
      password: "Password123",
    });
    expect(res.statusCode).toBe(200);
    student2Token = res.body.token;
  });

  it("professor adds availability slot T1", async () => {
    const res = await request(app)
      .post("/api/availability")
      .set("Authorization", `Bearer ${professorToken}`)
      .send({ timeSlot: "2025-09-01T10:00:00" });
    expect(res.statusCode).toBe(201);
    availabilityId1 = res.body.availability._id;
  });

  it("professor adds availability slot T2", async () => {
    const res = await request(app)
      .post("/api/availability")
      .set("Authorization", `Bearer ${professorToken}`)
      .send({ timeSlot: "2025-09-01T11:00:00" });
    expect(res.statusCode).toBe(201);
    availabilityId2 = res.body.availability._id;
  });

  it("student A1 fetches professor availability", async () => {
    const res = await request(app)
      .get(`/api/availability/${professorId}`)
      .set("Authorization", `Bearer ${student1Token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.availabilities.length).toBeGreaterThanOrEqual(2);
  });

  it("student A1 books appointment T1", async () => {
    const res = await request(app)
      .post(`/api/appointment/${availabilityId1}`)
      .set("Authorization", `Bearer ${student1Token}`);
    expect(res.statusCode).toBe(201);
    appointmentId1 = res.body.appointment._id;
  });

  it("student A2 books appointment T2", async () => {
    const res = await request(app)
      .post(`/api/appointment/${availabilityId2}`)
      .set("Authorization", `Bearer ${student2Token}`);
    expect(res.statusCode).toBe(201);
    appointmentId2 = res.body.appointment._id;
  });

  it("professor cancels Student A1's appointment", async () => {
    const res = await request(app)
      .delete(`/api/appointment/pro/${appointmentId1}`)
      .set("Authorization", `Bearer ${professorToken}`);
    expect(res.statusCode).toBe(200);
  });

  it("student A1 checks their appointments (should be empty)", async () => {
    const res = await request(app)
      .get("/api/appointment")
      .set("Authorization", `Bearer ${student1Token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.appointments.length).toBe(0);
  });

  it("student A2 still has their appointment", async () => {
    const res = await request(app)
      .get("/api/appointment")
      .set("Authorization", `Bearer ${student2Token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.appointments.length).toBe(1);
  });
});
