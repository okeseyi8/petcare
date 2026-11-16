import type { TCreateAppointment } from "./appointment.schema";

export async function requestAppointment(payload: TCreateAppointment): Promise<void> {
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "We couldn't send your request. Please try again or call us.");
  }
}
