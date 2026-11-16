import { appointmentSchema } from "@/features/appointments/appointment.schema";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = appointmentSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Some details are missing or invalid.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // ponytail: no booking backend yet — the request is validated and logged only.
  // Forward `parsed.data` to the practice-management system / email here.
  console.info("[appointments] request received", { service: parsed.data.service, date: parsed.data.date });

  return Response.json({ ok: true }, { status: 201 });
}
