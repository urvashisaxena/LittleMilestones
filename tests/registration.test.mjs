import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateRegistration,
  monthlyAnniversary,
  calendarToday,
} from "../src/lib/registration/validation.ts";
const now = new Date("2026-10-20T12:00:00Z");
const valid = {
  babyName: "Élodie 李",
  gender: "",
  dateOfBirth: "2026-06-20",
  email: "parent@example.com",
  timeZone: "America/New_York",
};
function form(values = {}) {
  const f = new FormData();
  for (const [k, v] of Object.entries({ ...valid, ...values })) f.set(k, v);
  return f;
}
test("accepts valid registration with optional gender omitted and trims names", () => {
  const f = form({ babyName: "  Élodie 李  " });
  f.delete("gender");
  const r = validateRegistration(f, now);
  assert.equal(r.status, "validated");
  assert.equal(r.values.babyName, "Élodie 李");
  assert.equal(r.values.gender, "");
});
test("accepts birth today and rejects future dates", () => {
  assert.equal(
    validateRegistration(form({ dateOfBirth: "2026-10-20" }), now).status,
    "validated",
  );
  assert.ok(
    validateRegistration(form({ dateOfBirth: "2026-10-21" }), now).errors
      .dateOfBirth,
  );
});
test("strictly younger than 12 months, using calendar anniversaries", () => {
  assert.equal(
    validateRegistration(form({ dateOfBirth: "2025-10-21" }), now).status,
    "validated",
  );
  for (const dob of ["2025-10-20", "2025-10-19", "2020-10-20"])
    assert.ok(
      validateRegistration(form({ dateOfBirth: dob }), now).errors.dateOfBirth,
    );
});
test("clamps month ends from original birthday, handles leap years", () => {
  assert.equal(monthlyAnniversary("2024-01-31", 1), "2024-02-29");
  assert.equal(monthlyAnniversary("2024-01-31", 2), "2024-03-31");
  assert.equal(monthlyAnniversary("2024-02-29", 12), "2025-02-28");
  assert.ok(
    validateRegistration(
      form({ dateOfBirth: "2024-02-29" }),
      new Date("2025-02-28T12:00:00Z"),
    ).errors.dateOfBirth,
  );
});
test("rejects invalid dates, malformed input and missing fields", () => {
  for (const dob of ["2026-02-29", "2026-04-31", "not-a-date", "2026-6-01", ""])
    assert.ok(
      validateRegistration(form({ dateOfBirth: dob }), now).errors.dateOfBirth,
    );
  for (const field of Object.keys(valid).filter((k) => k !== "gender")) {
    const f = form();
    f.delete(field);
    assert.equal(validateRegistration(f, now).status, "invalid");
  }
});
test("local calendar, not UTC timestamp, determines eligibility", () => {
  const instant = new Date("2026-10-20T00:30:00Z");
  assert.equal(calendarToday(instant, "America/Los_Angeles"), "2026-10-19");
  assert.equal(
    validateRegistration(
      form({ dateOfBirth: "2025-10-20", timeZone: "America/Los_Angeles" }),
      instant,
    ).status,
    "validated",
  );
  assert.ok(
    validateRegistration(
      form({ dateOfBirth: "2025-10-20", timeZone: "Asia/Tokyo" }),
      instant,
    ).errors.dateOfBirth,
  );
  assert.equal(
    calendarToday(new Date("2026-03-08T07:30:00Z"), "America/New_York"),
    "2026-03-08",
  );
});
test("rejects invalid gender, timezone, email, names and excessive input", () => {
  for (const [field, value] of [
    ["gender", "invalid"],
    ["timeZone", "Mars/Olympus"],
    ["timeZone", ""],
    ["email", "parent@"],
    ["email", "a\nb@example.com"],
    ["babyName", "<script>"],
    ["babyName", "a".repeat(81)],
  ])
    assert.ok(
      validateRegistration(form({ [field]: value }), now).errors[field],
    );
});
test("rejects repeated fields and file uploads", () => {
  const duplicate = form();
  duplicate.append("email", "other@example.com");
  assert.ok(validateRegistration(duplicate, now).errors.email);
  const file = form();
  file.set("babyName", new Blob(["x"]), "name.txt");
  assert.ok(validateRegistration(file, now).errors.babyName);
});
test("does not include deferred fields or arbitrary metadata in validated data", () => {
  const f = form();
  f.set("expectedDueDate", "2027-01-01");
  f.set("healthTracking", "yes");
  const r = validateRegistration(f, now);
  assert.equal(r.status, "validated");
  assert.deepEqual(Object.keys(r.values).sort(), Object.keys(valid).sort());
});
