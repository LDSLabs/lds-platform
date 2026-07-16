// Copy for the waitlist form. The actual submission behavior (Formspree vs.
// local-only mode) is implemented in
// src/components/WaitlistForm/WaitlistForm.jsx and controlled by
// `siteConfig.formEndpoint` (src/config/siteConfig.js).
export const waitlist = {
  title: 'Get early access',
  description:
    "Leave your name and email and we'll reach out as soon as early access opens.",
  fields: {
    name: { label: 'Name', placeholder: 'Your name' },
    email: { label: 'Email', placeholder: 'you@company.com' },
    beta: { label: "I'd like to take part in the beta program" },
  },
  submitLabel: 'Request early access',
  submittingLabel: 'Sending…',
  // Shown only after a real, successful HTTP response from the configured
  // form endpoint.
  successMessage: "Thanks! Your request was received — we'll be in touch soon.",
  // Shown when no form endpoint is configured yet. Deliberately avoids any
  // claim that data was received, sent, or saved.
  localNoticeMessage:
    "Thanks for the interest! This form isn't connected to a live service yet, so nothing was sent. Early access registration will open soon.",
  // Shown when a configured form endpoint responds with an error or the
  // request fails (e.g. network issue).
  errorMessage:
    'Something went wrong sending your request. Please try again in a moment.',
  privacyNote: 'No spam. Only product updates and early access invitations.',
  errors: {
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
  },
};
