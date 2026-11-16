"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { appointmentSchema, todayISO, type TCreateAppointment } from "../appointment.schema";
import { requestAppointment } from "../appointments.api";
import { SERVICE_OPTIONS } from "../appointments.constants";

const EMPTY: TCreateAppointment = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  message: "",
};

export function AppointmentForm() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TCreateAppointment>({ resolver: zodResolver(appointmentSchema), defaultValues: EMPTY });

  const onSubmit = async (values: TCreateAppointment) => {
    setSubmitError(null);
    try {
      await requestAppointment(values);
      setSubmittedName(values.firstName);
      reset(EMPTY);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const describedBy = (name: keyof TCreateAppointment) => (errors[name] ? `appt-${name}-error` : undefined);

  if (submittedName) {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center gap-5">
        <CircleCheck className="size-12 text-teal-200" strokeWidth={1.75} aria-hidden />
        <h3 className="text-3xl font-semibold text-white">Thanks, {submittedName}. Request received.</h3>
        <p className="max-w-md text-on-dark-muted">
          Our front desk will call or email you within one working day to confirm a time. For anything urgent, call
          our emergency line.
        </p>
        <Button type="button" variant="light" onClick={() => setSubmittedName(null)}>
          Book another visit
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field id="appt-firstName" label="First name" error={errors.firstName?.message}>
        <Input
          id="appt-firstName"
          autoComplete="given-name"
          placeholder="Hannah"
          aria-invalid={!!errors.firstName}
          aria-describedby={describedBy("firstName")}
          {...register("firstName")}
        />
      </Field>
      <Field id="appt-lastName" label="Last name" error={errors.lastName?.message}>
        <Input
          id="appt-lastName"
          autoComplete="family-name"
          placeholder="Cole"
          aria-invalid={!!errors.lastName}
          aria-describedby={describedBy("lastName")}
          {...register("lastName")}
        />
      </Field>
      <Field id="appt-email" label="Email" error={errors.email?.message}>
        <Input
          id="appt-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={describedBy("email")}
          {...register("email")}
        />
      </Field>
      <Field id="appt-phone" label="Phone" error={errors.phone?.message}>
        <Input
          id="appt-phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 000-0000"
          aria-invalid={!!errors.phone}
          aria-describedby={describedBy("phone")}
          {...register("phone")}
        />
      </Field>
      <Field id="appt-service" label="Service" error={errors.service?.message}>
        <div className="relative">
          <Select
            id="appt-service"
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
            className="pr-10"
            {...register("service")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-on-dark-muted"
            aria-hidden
          />
        </div>
      </Field>
      <Field id="appt-date" label="Preferred date" error={errors.date?.message}>
        <Input
          id="appt-date"
          type="date"
          aria-invalid={!!errors.date}
          aria-describedby={describedBy("date")}
          // Set on interaction so no date is computed during prerender.
          onFocus={(event) => {
            event.currentTarget.min = todayISO();
          }}
          {...register("date")}
        />
      </Field>
      <Field id="appt-message" label="Anything we should know? (optional)" error={errors.message?.message} className="sm:col-span-2">
        <Textarea
          id="appt-message"
          rows={4}
          placeholder="Your pet's name, age and what you'd like us to look at"
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          {...register("message")}
        />
      </Field>

      {submitError && (
        <p role="alert" className="rounded-xl bg-[#f4a59c]/10 px-4 py-3 text-sm text-[#f9c7c0] sm:col-span-2">
          {submitError}
        </p>
      )}

      <Button type="submit" variant="light" disabled={isSubmitting} className="justify-between sm:col-span-2">
        {isSubmitting ? "Sending…" : submitError ? "Try again" : "Request appointment"}
      </Button>
    </form>
  );
}
