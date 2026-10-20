import { ArrowIcon } from "@/components/arrow-icon";
import Link from "next/link";

const questions = [
  [
    "When will my emails arrive?",
    "The planned service sends each guide seven calendar days before your baby reaches a new monthly age, from month 1 through month 12. If you join within that seven-day window, that month's guide will arrive after payment confirmation.",
  ],
  [
    "What if my baby develops at a different pace?",
    "Every baby follows their own path. This service is educational and does not diagnose, screen, or replace care from your child's clinician. Bring any developmental concerns to your pediatrician.",
  ],
  [
    "Can I use this for a baby born early?",
    "V1 uses chronological age based on date of birth. Corrected-age support for babies born prematurely is planned for V1.1. Ask your clinician how to interpret development for your baby.",
  ],
  [
    "Can I cancel whenever I need to?",
    "Yes. The planned service includes secure subscription management through Stripe. One subscription covers one baby, and milestone emails end after the month 12 guide.",
  ],
  [
    "Is the guidance medically reviewed?",
    "Not yet. The service and sample below are in development. Guides will reference CDC and American Academy of Pediatrics guidance and remain marked as drafts until medically reviewed.",
  ],
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">FOR THEIR FIRST YEAR. AND YOURS.</p>
          <h1>
            Little moments.
            <br />
            Big <em>milestones.</em>
          </h1>
          <p className="intro">
            A little reassurance for the road ahead. Gentle, age-specific
            guidance delivered before your baby’s next month begins.
          </p>
          <Link className="button" href="/subscribe">
            Find your next little milestone <ArrowIcon />
          </Link>
          <p className="fine">
            Planned at $1/month · One baby · Cancel anytime
          </p>
          <div className="hero-note">
            <span aria-hidden="true">☀</span>
            <p>
              Less searching. More being there.
              <br />
              <strong>Made for real life with a little one.</strong>
            </p>
          </div>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label="Illustration of a sleeping baby wrapped in a sage blanket, beneath a sun and stars"
        >
          <span className="art-label">GROWING, TOGETHER</span>
          <div className="sun" />
          <span className="spark s1">✳</span>
          <span className="spark s2">✧</span>
          <div className="arch">
            <div className="blanket">
              <div className="baby-head">
                <div className="curl" />
                <span className="eye left" />
                <span className="eye right" />
                <span className="cheek left" />
                <span className="cheek right" />
                <span className="smile" />
              </div>
              <div className="blanket-line" />
            </div>
          </div>
          <div className="art-card">
            <span aria-hidden="true">♡</span>
            <div>
              A new month. A little more wonder.
              <small>Room to grow at their own pace.</small>
            </div>
          </div>
          <span className="art-caption">Every little step is a big thing.</span>
        </div>
      </section>
      <div className="reassurance">
        <div className="wrap reassurance-inner">
          <span>Thoughtful guidance, without the overwhelm</span>
          <span>✳ Age-specific</span>
          <span>♡ Parent-friendly</span>
          <span>Just $1 a month</span>
        </div>
      </div>
      <section id="how-it-works" className="wrap section">
        <p className="eyebrow">A SMALL RITUAL. A LITTLE REASSURANCE.</p>
        <h2>One less thing to figure out.</h2>
        <div className="steps">
          {[
            [
              "01",
              "Tell us about your little one",
              "Your baby's birthday helps us find the right guide for the month ahead.",
            ],
            [
              "02",
              "A little heads-up, right on time",
              "Your guide arrives seven days before each monthly birthday, from months 1–12.",
            ],
            [
              "03",
              "Make room for the everyday magic",
              "Explore what to look out for, simple play ideas, and questions to bring to your pediatrician.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="step-number">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="sample" className="sample-section">
        <div className="wrap sample-grid">
          <div>
            <p className="eyebrow">A PEEK INSIDE YOUR INBOX</p>
            <h2>
              A gentle guide.
              <br />
              Never a checklist.
            </h2>
            <p className="body-copy">
              Physical development, communication, connection, and little ways
              to play. All in one thoughtful email you can read during a quiet
              moment.
            </p>
            <p className="body-copy">
              Because knowing what might come next can help you enjoy what’s
              happening now.
            </p>
            <p className="source-note">
              Future guides will reference{" "}
              <a href="https://www.cdc.gov/act-early/milestones/index.html">
                CDC developmental milestones
              </a>{" "}
              and{" "}
              <a href="https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx">
                AAP guidance for babies
              </a>
              .
            </p>
          </div>
          <article className="email-card">
            <div className="email-top">
              <span>✳ little milestones</span>
              <span>SAMPLE EMAIL</span>
            </div>
            <p className="eyebrow">A LITTLE NOTE FOR THE MONTH AHEAD</p>
            <h3>Hello, little explorer.</h3>
            <p>
              Another month of getting to know each other. There’s no race, and
              no perfect pace.
            </p>
            <div className="email-divider" />
            <h4>♡ A moment to connect</h4>
            <p>
              Try a few quiet minutes of talking or singing together. Follow
              your baby’s cues and pause when they need a break.
            </p>
            <h4>✳ Something to bring to your next visit</h4>
            <p>
              Write down the small changes you notice and any questions you’d
              like to ask your baby’s clinician.
            </p>
            <div className="draft-note">
              Illustrative preview · Not a clinical milestone guide. Content is
              draft and requires medical review.
            </div>
          </article>
        </div>
      </section>
      <section id="pricing" className="wrap section pricing-grid">
        <div>
          <p className="eyebrow">SMALL PRICE. THOUGHTFUL SUPPORT.</p>
          <h2>
            A little guidance,
            <br />
            every new month.
          </h2>
          <p className="body-copy">
            No overflowing feeds. No extra app to check.
            <br />
            Just a useful note, when it matters.
          </p>
        </div>
        <article className="price-card">
          <p className="eyebrow">THE FIRST-YEAR COMPANION</p>
          <div className="price">
            $1 <span>USD / month</span>
          </div>
          <p>One baby. A whole year of little discoveries.</p>
          <ul>
            <li>Age-specific guides for months 1–12</li>
            <li>Simple play and connection ideas</li>
            <li>A heads-up seven days before each new month</li>
            <li>Secure subscription management</li>
          </ul>
          <Link className="button" href="/subscribe">
            Start your little journey <ArrowIcon />
          </Link>
          <p className="fine">
            Coming soon · Registration and billing are not live
          </p>
        </article>
      </section>
      <section className="wrap section faq">
        <p className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p>
        <h2>Little questions, answered.</h2>
        {questions.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <section className="closing wrap">
        <span aria-hidden="true">✳</span>
        <h2>
          They grow a little every day.
          <br />
          You’re growing, too.
        </h2>
        <p>Let’s take the next little step together.</p>
        <Link className="button" href="/subscribe">
          Explore Little Milestones <ArrowIcon />
        </Link>
      </section>
      <p className="disclaimer wrap">
        Educational information only. Not medical advice or a substitute for
        professional care. Contact your child’s clinician with questions or
        concerns about their development.
      </p>
    </main>
  );
}
