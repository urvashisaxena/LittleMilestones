"use client";

import { useActionState, useEffect, useRef } from "react";
import { validateRegistrationAction } from "@/app/subscribe/actions";
import {
  initialRegistrationState,
  type RegistrationValues,
} from "@/lib/registration/validation";

export function RegistrationForm({ timeZones }: { timeZones: string[] }) {
  const [state, action, pending] = useActionState(
    validateRegistrationAction,
    initialRegistrationState,
  );
  const feedback = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status !== "idle") feedback.current?.focus();
  }, [state]);
  const attributes = (field: keyof RegistrationValues) => ({
    id: field,
    name: field,
    defaultValue: state.values[field],
    "aria-invalid": Boolean(state.errors[field]),
    "aria-describedby": state.errors[field] ? `${field}-error` : undefined,
  });
  const error = (field: keyof RegistrationValues) =>
    state.errors[field] && (
      <p className="field-error" id={`${field}-error`}>
        {state.errors[field]}
      </p>
    );
  return (
    <form action={action} className="registration-form" noValidate>
      <div
        ref={feedback}
        tabIndex={-1}
        aria-live="polite"
        className={state.status === "idle" ? "" : "form-feedback"}
      >
        {state.status === "invalid" && (
          <>
            <h2>Please check your details</h2>
            <ul>
              {Object.entries(state.errors).map(([field, message]) => (
                <li key={field}>
                  <a href={`#${field}`}>{message}</a>
                </li>
              ))}
            </ul>
          </>
        )}
        {state.status === "validated" && (
          <>
            <h2>Your details passed validation</h2>
            <p>
              This is a preview only. Nothing was saved, no subscription was
              created, and no payment or email was sent. Secure registration and
              Checkout are coming in later phases.
            </p>
          </>
        )}
      </div>
      <label htmlFor="babyName">
        Baby’s name <span>(required)</span>
      </label>
      <input
        {...attributes("babyName")}
        required
        maxLength={80}
        autoComplete="off"
      />
      {error("babyName")}
      <label htmlFor="gender">
        Baby’s gender <span>(optional)</span>
      </label>
      <select {...attributes("gender")}>
        <option value="">Prefer to leave blank</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Another gender</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
      </select>
      {error("gender")}
      <label htmlFor="dateOfBirth">
        Date of birth <span>(required)</span>
      </label>
      <input
        {...attributes("dateOfBirth")}
        type="date"
        required
        aria-describedby={`birth-help${state.errors.dateOfBirth ? " dateOfBirth-error" : ""}`}
      />
      <p id="birth-help" className="field-help">
        For babies younger than 12 months. V1 uses chronological age from date
        of birth.
      </p>
      {error("dateOfBirth")}
      <label htmlFor="email">
        Parent’s email <span>(required)</span>
      </label>
      <input
        {...attributes("email")}
        type="email"
        required
        maxLength={254}
        autoComplete="email"
        inputMode="email"
      />
      {error("email")}
      <label htmlFor="timeZone">
        Your time zone <span>(required)</span>
      </label>
      <select
        {...attributes("timeZone")}
        required
        aria-describedby={`timezone-help${state.errors.timeZone ? " timeZone-error" : ""}`}
      >
        <option value="UTC">UTC</option>
        {timeZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      <p className="field-help" id="timezone-help">
        Please choose your local time zone. Future delivery dates will use this
        calendar, including daylight-saving changes.
      </p>
      {error("timeZone")}
      <p className="field-help">
        Use fictional details to try this preview. Details are sent to this
        server for validation but are not saved. No account is created.
      </p>
      <button className="button" type="submit" disabled={pending}>
        {pending ? "Checking details…" : "Check my details"}
      </button>
    </form>
  );
}
