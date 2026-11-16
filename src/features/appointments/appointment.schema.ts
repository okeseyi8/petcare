import { z } from "zod";
import { SERVICE_VALUES } from "./appointments.constants";

/** Local calendar date as YYYY-MM-DD, the format <input type="date"> uses. */
export function todayISO(now = new Date()) {
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export const appointmentSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(60),
  lastName: z.string().trim().min(1, "Enter your last name").max(60),
  email: z.email("Enter a valid email, like name@example.com"),
  phone: z
    .string()
    .trim()
    .regex(/^[+(\d][\d\s().-]{6,}$/, "Enter a phone number we can call you on"),
  service: z.string().refine((value) => SERVICE_VALUES.includes(value), "Choose a service"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date")
    .refine((value) => value >= todayISO(), "Choose today or a later date"),
  message: z.string().trim().max(1000, "Keep it under 1,000 characters").optional(),
});

export type TCreateAppointment = z.infer<typeof appointmentSchema>;
