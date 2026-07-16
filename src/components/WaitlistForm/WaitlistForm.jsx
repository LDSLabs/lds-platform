import { useId, useRef, useState } from 'react';
import Button from '../Button/Button.jsx';
import { waitlist } from '../../content/waitlist.js';
import { siteConfig } from '../../config/siteConfig.js';
import styles from './WaitlistForm.module.css';

const initialValues = { name: '', email: '', beta: false };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function WaitlistForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | local | error

  // Guards against duplicate submissions (e.g. double-click, double Enter)
  // independently of the async state update timing.
  const submissionInFlightRef = useRef(false);

  const nameId = useId();
  const emailId = useId();
  const betaId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const statusId = useId();

  const isConfigured = Boolean(siteConfig.formEndpoint);

  const handleChange = (field) => (event) => {
    const value = field === 'beta' ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = waitlist.errors.name;
    }
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = waitlist.errors.email;
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submissionInFlightRef.current) {
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    submissionInFlightRef.current = true;
    setStatus('submitting');

    if (!isConfigured) {
      // No form service configured yet (siteConfig.formEndpoint is null).
      // Validation above still runs, but we deliberately stop short of a
      // fake "success" — nothing is sent or saved anywhere.
      setStatus('local');
      submissionInFlightRef.current = false;
      return;
    }

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          beta: values.beta,
        }),
      });

      if (!response.ok) {
        throw new Error(`Form endpoint responded with status ${response.status}`);
      }

      setStatus('success');
      setValues(initialValues);
    } catch (error) {
      console.error('Waitlist submission failed:', error);
      setStatus('error');
    } finally {
      submissionInFlightRef.current = false;
    }
  };

  const isSubmitting = status === 'submitting';

  if (status === 'success' || status === 'local') {
    return (
      <section id="waitlist" className={styles.section} aria-labelledby="waitlist-title">
        <div className="container">
          <h2 id="waitlist-title" className={styles.title}>
            {waitlist.title}
          </h2>
          <p role="status" className={styles.successMessage}>
            {status === 'success' ? waitlist.successMessage : waitlist.localNoticeMessage}
          </p>
          <p className={styles.privacyNote}>{waitlist.privacyNote}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className={styles.section} aria-labelledby="waitlist-title">
      <div className="container">
        <h2 id="waitlist-title" className={styles.title}>
          {waitlist.title}
        </h2>
        <p className={styles.description}>{waitlist.description}</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {status === 'error' && (
            <p className={styles.formError} role="alert">
              {waitlist.errorMessage}
            </p>
          )}

          <div className={styles.field}>
            <label htmlFor={nameId} className={styles.label}>
              {waitlist.fields.name.label}
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              className={styles.input}
              placeholder={waitlist.fields.name.placeholder}
              value={values.name}
              onChange={handleChange('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? nameErrorId : undefined}
              autoComplete="name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p id={nameErrorId} className={styles.errorText} role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor={emailId} className={styles.label}>
              {waitlist.fields.email.label}
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              className={styles.input}
              placeholder={waitlist.fields.email.placeholder}
              value={values.email}
              onChange={handleChange('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? emailErrorId : undefined}
              autoComplete="email"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p id={emailErrorId} className={styles.errorText} role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className={styles.checkboxField}>
            <input
              id={betaId}
              name="beta"
              type="checkbox"
              className={styles.checkbox}
              checked={values.beta}
              onChange={handleChange('beta')}
              disabled={isSubmitting}
            />
            <label htmlFor={betaId} className={styles.checkboxLabel}>
              {waitlist.fields.beta.label}
            </label>
          </div>

          <Button type="submit" variant="primary" className={styles.submit} disabled={isSubmitting}>
            {isSubmitting ? waitlist.submittingLabel : waitlist.submitLabel}
          </Button>

          <p id={statusId} className="visually-hidden" aria-live="polite">
            {isSubmitting ? waitlist.submittingLabel : ''}
          </p>

          <p className={styles.privacyNote}>{waitlist.privacyNote}</p>
        </form>
      </div>
    </section>
  );
}

export default WaitlistForm;

