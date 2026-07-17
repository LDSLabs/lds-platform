import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button.jsx';
import { siteConfig } from '../../config/siteConfig.js';
import styles from './WaitlistForm.module.css';

const initialValues = { name: '', email: '', betaInterest: false };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Formspree submission metadata. `_subject` sets the notification email
// subject line; `_source` is a free-form label to identify this form if
// multiple forms ever point at the same Formspree project.
const FORM_SOURCE = 'landing-page';
const FORM_SUBJECT = 'New LDS Labs early access signup';

function WaitlistForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | local | error | validation-error

  // Guards against duplicate submissions (e.g. double-click, double Enter)
  // independently of the async state update timing.
  const submissionInFlightRef = useRef(false);

  const nameId = useId();
  const emailId = useId();
  const betaId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();

  const isConfigured = Boolean(siteConfig.formEndpoint);

  const handleChange = (field) => (event) => {
    const value = field === 'betaInterest' ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = t('waitlist.errors.name');
    }
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = t('waitlist.errors.email');
    }
    return nextErrors;
  };

  // Formspree returns errors in the shape:
  //   { errors: [{ field: 'email', message: '...', code: '...' }, ...] }
  // We use this only to decide between a "check your input" message and a
  // generic failure message — the raw Formspree message text is never
  // surfaced to the visitor.
  const isValidationLikeStatus = (httpStatus) => httpStatus === 400 || httpStatus === 422;

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

    if (!isConfigured) {
      // No form service configured (siteConfig.formEndpoint is empty).
      // Validation above still runs, but no request is ever sent and we
      // never claim the submission succeeded.
      setStatus('local');
      return;
    }

    submissionInFlightRef.current = true;
    setStatus('submitting');

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
          betaInterest: values.betaInterest,
          _source: FORM_SOURCE,
          _subject: FORM_SUBJECT,
        }),
      });

      if (!response.ok) {
        setStatus(isValidationLikeStatus(response.status) ? 'validation-error' : 'error');
        return;
      }

      setStatus('success');
      setValues(initialValues);
    } catch (error) {
      // Network failure or unexpected error — details are logged only for
      // local debugging, never shown to the visitor, and input is kept so
      // they don't have to retype anything.
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
            {t('waitlist.title')}
          </h2>
          <div role="status" aria-live="polite" className={styles.successMessage}>
            {status === 'success' ? (
              <>
                <p className={styles.successTitle}>{t('waitlist.successTitle')}</p>
                <p>{t('waitlist.successMessage')}</p>
              </>
            ) : (
              <p>{t('waitlist.localNoticeMessage')}</p>
            )}
          </div>
          <p className={styles.privacyNote}>{t('waitlist.privacyNote')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className={styles.section} aria-labelledby="waitlist-title">
      <div className="container">
        <h2 id="waitlist-title" className={styles.title}>
          {t('waitlist.title')}
        </h2>
        <p className={styles.description}>{t('waitlist.description')}</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {(status === 'error' || status === 'validation-error') && (
            <p className={styles.formError} role="alert">
              {status === 'validation-error'
                ? t('waitlist.validationErrorMessage')
                : t('waitlist.errorMessage')}
            </p>
          )}

          <div className={styles.field}>
            <label htmlFor={nameId} className={styles.label}>
              {t('waitlist.fields.name.label')}
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              className={styles.input}
              placeholder={t('waitlist.fields.name.placeholder')}
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
              {t('waitlist.fields.email.label')}
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              className={styles.input}
              placeholder={t('waitlist.fields.email.placeholder')}
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
              name="betaInterest"
              type="checkbox"
              className={styles.checkbox}
              checked={values.betaInterest}
              onChange={handleChange('betaInterest')}
              disabled={isSubmitting}
            />
            <label htmlFor={betaId} className={styles.checkboxLabel}>
              {t('waitlist.fields.betaInterest.label')}
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className={styles.submit}
            disabled={isSubmitting}
            aria-live="polite"
          >
            {isSubmitting ? t('waitlist.submittingLabel') : t('waitlist.submitLabel')}
          </Button>

          <p className={styles.privacyNote}>{t('waitlist.privacyNote')}</p>
        </form>
      </div>
    </section>
  );
}

export default WaitlistForm;


