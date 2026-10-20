export type RegistrationValues = {
  babyName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  timeZone: string;
};
export type RegistrationErrors = Partial<
  Record<keyof RegistrationValues, string>
>;
export type RegistrationState = {
  status: "idle" | "invalid" | "validated";
  errors: RegistrationErrors;
  values: RegistrationValues;
};
export const initialRegistrationState: RegistrationState = {
  status: "idle",
  errors: {},
  values: {
    babyName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    timeZone: "UTC",
  },
};

// Date-only calendar arithmetic avoids elapsed-hour and DST age calculations.
export function parseCalendarDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
    ? date
    : null;
}
export function monthlyAnniversary(
  dateOfBirth: string,
  months: number,
): string {
  const birth = parseCalendarDate(dateOfBirth);
  if (!birth || !Number.isInteger(months) || months < 0 || months > 12)
    throw new Error("Invalid anniversary input");
  const year = birth.getUTCFullYear();
  const month = birth.getUTCMonth() + months;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(birth.getUTCDate(), lastDay)))
    .toISOString()
    .slice(0, 10);
}
export function calendarToday(now: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (name: string) => parts.find((p) => p.type === name)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function validateRegistration(
  form: FormData,
  now = new Date(),
): RegistrationState {
  const errors: RegistrationErrors = {};
  const read = (field: keyof RegistrationValues, limit: number) => {
    const entries = form.getAll(field);
    if (
      entries.length > 1 ||
      (entries.length === 1 && typeof entries[0] !== "string")
    ) {
      errors[field] = "Please provide one valid value.";
      return "";
    }
    const value = typeof entries[0] === "string" ? entries[0].trim() : "";
    if (value.length > limit) {
      errors[field] = `Please use ${limit} characters or fewer.`;
      return "";
    }
    return value;
  };
  // Explicit allowlist: no due date, corrected age, health data, or arbitrary metadata.
  const values: RegistrationValues = {
    babyName: read("babyName", 80),
    gender: read("gender", 20),
    dateOfBirth: read("dateOfBirth", 10),
    email: read("email", 254),
    timeZone: read("timeZone", 100),
  };
  if (!values.babyName || /[\p{Cc}\p{Cf}<>]/u.test(values.babyName))
    errors.babyName =
      "Enter a baby name using 1–80 characters, without control characters or angle brackets.";
  if (
    !["", "female", "male", "other", "prefer-not-to-say"].includes(
      values.gender,
    )
  )
    errors.gender = "Choose one of the listed options.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
    /[\p{Cc}\p{Cf}]/u.test(values.email)
  )
    errors.email = "Enter a valid parent email address.";
  let today: string | undefined;
  try {
    if (
      !values.timeZone ||
      (!values.timeZone.includes("/") && values.timeZone !== "UTC")
    )
      throw new Error("Invalid timezone");
    today = calendarToday(now, values.timeZone);
  } catch {
    errors.timeZone =
      "Choose a valid IANA time zone, such as America/New_York or UTC.";
  }
  if (!parseCalendarDate(values.dateOfBirth))
    errors.dateOfBirth = "Enter a real date of birth.";
  else if (today) {
    if (values.dateOfBirth > today)
      errors.dateOfBirth =
        "Date of birth cannot be in the future in your time zone.";
    else if (today >= monthlyAnniversary(values.dateOfBirth, 12))
      errors.dateOfBirth = "Registration is for babies younger than 12 months.";
  }
  return {
    status: Object.keys(errors).length ? "invalid" : "validated",
    errors,
    values,
  };
}
