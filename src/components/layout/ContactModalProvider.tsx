"use client";

import {
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./ContactModal.module.scss";

const ContactModalContext = createContext<(() => void) | null>(null);

export function useContactModal() {
  const openContactModal = useContext(ContactModalContext);
  if (!openContactModal) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return openContactModal;
}

export default function ContactModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsSubmitted(false);
    setIsVisible(false);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      const frame = requestAnimationFrame(() => {
        setIsVisible(true);
        companyInputRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (dialog.open) {
      closeTimerRef.current = setTimeout(() => {
        dialog.close();
        closeTimerRef.current = null;
      }, 220);
    }

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    []
  );

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subject = encodeURIComponent(`Project inquiry from ${company}`);
    const body = encodeURIComponent(
      `Company Name: ${company}\nEmail: ${email}\nPhone Number: ${phone}`
    );

    window.location.href = `mailto:hello@webza.in?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <ContactModalContext.Provider value={openModal}>
      {children}
      <dialog
        ref={dialogRef}
        className={`${styles.dialog} ${isVisible ? styles.visible : ""}`}
        aria-labelledby="contact-modal-title"
        onCancel={(event) => {
          event.preventDefault();
          closeModal();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
      >
        <div className={styles.panel}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="Close contact form"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          {!isSubmitted ? (
            <>
              <span className={styles.eyebrow}>LET&apos;S BUILD SOMETHING</span>
              <h2 id="contact-modal-title">Tell us about your project.</h2>
              <p className={styles.intro}>
                Share a few details and we&apos;ll help you take the next step.
              </p>

              <form className={styles.form} onSubmit={submitInquiry}>
                <label>
                  Company Name
                  <input
                    ref={companyInputRef}
                    type="text"
                    name="company"
                    autoComplete="organization"
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label>
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    pattern="[+0-9().\s-]{7,20}"
                    title="Use 7 to 20 characters: digits, spaces, +, parentheses, periods or hyphens."
                    required
                  />
                </label>
                <button className={styles.submitButton} type="submit">
                  Send inquiry <span aria-hidden="true">↗</span>
                </button>
                <p className={styles.formNote}>
                  Your email app will open with these details ready to send.
                </p>
              </form>
            </>
          ) : (
            <div className={styles.confirmation} role="status">
              <span className={styles.confirmationMark} aria-hidden="true">
                ✓
              </span>
              <h2 id="contact-modal-title">Thanks for reaching out.</h2>
              <p>
                Your email app should open with your inquiry details. Send the
                message there to complete your request. If it didn&apos;t open,
                email us at <a href="mailto:hello@webza.in">hello@webza.in</a>.
              </p>
              <button
                type="button"
                className={styles.submitButton}
                onClick={closeModal}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </dialog>
    </ContactModalContext.Provider>
  );
}
