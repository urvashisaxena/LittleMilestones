import Link from "next/link";
import { RegistrationForm } from "@/components/registration-form";
export const metadata = {
  title: "Registration preview | Little Milestones",
  robots: { index: false, follow: false },
};
export default function Subscribe() {
  return (
    <main id="main" className="wrap registration-page">
      <div>
        <p className="eyebrow">ONE LITTLE STEP AT A TIME</p>
        <h1>
          Let’s get to know
          <br />
          your <em>little one.</em>
        </h1>
        <p className="intro">
          A little guidance for the month ahead, based on your baby’s date of
          birth.
        </p>
        <div className="draft-note">
          <strong>Registration preview</strong>
          <br />
          Billing and email delivery are not active. Use fictional details to
          test the form; your details will not be saved.
        </div>
        <p className="body-copy">
          V1 uses chronological age only. Guidance for babies born prematurely
          using corrected age is planned for V1.1. Ask your clinician about your
          baby’s individual development.
        </p>
        <Link href="/">← Back to Little Milestones</Link>
      </div>
      <RegistrationForm timeZones={Intl.supportedValuesOf("timeZone")} />
    </main>
  );
}
