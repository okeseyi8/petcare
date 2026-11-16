import { SERVICES } from "../clinic/clinic.constants";

export const SERVICE_OPTIONS = [
  ...SERVICES.map((service) => ({ value: service.id, label: service.title })),
  { value: "other", label: "Something else" },
] as const;

export const SERVICE_VALUES: readonly string[] = SERVICE_OPTIONS.map((option) => option.value);
