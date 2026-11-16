import { describe, expect, it } from "vitest";
import { appointmentSchema, todayISO } from "./appointment.schema";

const valid = {
  firstName: "Hannah",
  lastName: "Cole",
  email: "hannah@example.com",
  phone: "(555) 014-2280",
  service: "wellness",
  date: todayISO(),
  message: "",
};

describe("appointmentSchema", () => {
  it("accepts a complete request for today", () => {
    expect(appointmentSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a bad email, a past date and an unknown service", () => {
    const result = appointmentSchema.safeParse({
      ...valid,
      email: "not-an-email",
      date: "2000-01-01",
      service: "teleportation",
    });
    expect(result.success).toBe(false);
    const fields = result.error?.issues.map((issue) => issue.path[0]);
    expect(fields).toEqual(expect.arrayContaining(["email", "date", "service"]));
  });
});
