"use server";

import {
  validateRegistration,
  type RegistrationState,
} from "@/lib/registration/validation";

export async function validateRegistrationAction(
  _previous: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  // Public validation-only endpoint. No database, cookies, logging, billing, or email.
  const result = validateRegistration(formData);
  if (result.status === "validated") {
    // Do not echo personal information in the success response.
    return {
      ...result,
      values: {
        babyName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        timeZone: "UTC",
      },
    };
  }
  return result;
}
