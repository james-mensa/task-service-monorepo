import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { isFormFilled } from "@utils/common";


/**
 * Generic type for form fields structure.
 */
export type FormFields<T> = { [K in keyof T]: T[K] };

/**
 * Custom hook for managing dynamic form state and validation.
 */
export const useFormManager = <T extends Record<string, any>>(initialFields: T) => {
  type FormState = FormFields<T> & {
    submitAttempt?: boolean;
  };

  const [formState, setFormState] = useState<FormState>({
    ...initialFields,
    submitAttempt: false,
  });

  /**
   * Handles updating the value of a form input or select field.
   *
   * @param key - The key of the form field to update.
   * @returns A change event handler function.
   */
  const handleFieldChange = (key: keyof T) => <O,>(
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent | O
  ) => {
    setFormState((prev) => ({
      ...prev,
      [key]: (event as React.ChangeEvent<HTMLInputElement> | SelectChangeEvent).target?.value ?? event,
    }));
  };

  /**
   * Checks if a specific field has an error after a submit attempt.
   *
   * @param key - The field key to check.
   * @returns True if the field is invalid and a submit was attempted, otherwise false.
   */
  const hasFieldError = (key: keyof T): boolean => {
    return formState.submitAttempt === true && formState[key] === '';
  };

  /**
   * Extracts current form data excluding internal fields like `submitAttempt`.
   *
   * @returns The cleaned form data.
   */
  const getFormData = (): T => {
    const data = {} as T;
    for (const key in formState) {
      if (key !== "submitAttempt") {
        data[key as keyof T] = formState[key as keyof T];
      }
    }
    return data;
  };

  /**
   * Validates if the form is filled correctly based on required and excluded fields.
   *
   * @param requiredFields - Fields that must be filled.
   * @param excludeFields - Fields to exclude from validation.
   * @returns True if valid, false otherwise.
   */
  const validateForm = (
    requiredFields?: (keyof T | "submitAttempt")[],
    excludeFields?: (keyof T | "submitAttempt")[]
  ): boolean => {
    console.log({formState})
    return isFormFilled<FormState>(formState, requiredFields, excludeFields);
  };

  /**
   * Handles form submission logic.
   *
   * @param validation - Optional configuration for required and excluded fields.
   * @returns Object containing `isValid` and the form `data`.
   */
  const onFormSubmit = (validation?: {
    requiredFields?: (keyof T)[];
    excludeFields?: (keyof T)[];
  }): { isValid: boolean; data: T } => {
    const isValid = validateForm(validation?.requiredFields, validation?.excludeFields);
    setFormState((prev) => ({ ...prev, submitAttempt: true }));
    return { isValid, data: getFormData() };
  };

  /**
   * Resets the form fields back to their initial empty state.
   */
  const resetForm = () => {
    const initializedFields = Object.keys(initialFields).reduce((acc, key) => {
      acc[key as keyof T] = '' as T[keyof T];
      return acc;
    }, {} as FormFields<T>);
    setFormState({ ...initializedFields, submitAttempt: false });
  };

  /**
   * Manually sets the submit attempt flag.
   *
   * @param attempt - Whether to mark that a submit attempt was made.
   */
  const setSubmitAttempt = (attempt: boolean = true) => {
    setFormState((prev) => ({ ...prev, submitAttempt: attempt }));
  };

  return {
    formState,
    setFormState,
    handleFieldChange,
    hasFieldError,
    getFormData,
    validateForm,
    onFormSubmit,
    resetForm,
    setSubmitAttempt,
  };
};
