import { forwardRef, type InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, id, className = "", ...inputProps }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div>
        <label htmlFor={fieldId} className="tw-label">
          {label}
        </label>
        <input
          id={fieldId}
          ref={ref}
          className={`tw-input ${error ? "!border-red-500 focus:!ring-red-500" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...inputProps}
        />
        {error ? (
          <p
            id={`${fieldId}-error`}
            className="mt-1.5 text-xs text-red-500 dark:text-red-400"
          >
            {error}
          </p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-text-muted dark:text-text-darkMuted">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

FormField.displayName = "FormField";
