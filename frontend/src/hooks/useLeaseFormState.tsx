import React, {useState} from 'react';
import {MAX_DAYS, MAX_HOURS, MAX_MINUTES, MAX_SECONDS, MAX_YEARS, MessageLeaseForm} from 'pages/Compose/interfaces';
import {isLeaseFormValid} from 'utils/helpers';


export type LeaseFormChangeHandler = (leaseType: 'seconds' | 'minutes' | 'hours' | 'days' | 'years') =>
  (event: React.ChangeEvent<HTMLInputElement>) => void;

export type LeaseFormState = {
  leaseForm: MessageLeaseForm,
  handleChange: LeaseFormChangeHandler,
  clearForm: () => void,
  leaseFormError: string,
  validate: () => void,
  clearError: () => void
}


/**
 * This hook manages the state for LeaseForm.
 * It's reusable.
 * @param leaseFormInitial
 */
export const useLeaseFormState = (leaseFormInitial: MessageLeaseForm): LeaseFormState => {
  const [leaseForm, setLeaseForm] = useState(leaseFormInitial);
  const [leaseFormError, setLeaseFormError] = useState("");

  const validate = () => {
    const isLeaseValid = isLeaseFormValid(leaseForm);
    if (!isLeaseValid.isValid) {
      setLeaseFormError(isLeaseValid.error);
      return;
    }
  }

  const clearForm = () => {
    setLeaseForm({days: 0, hours: 0, minutes: 0, seconds: 0, years: 0})
  }

  const clearError = () => {
    if (leaseFormError) {
      setLeaseFormError("");
    }
  }

  const handleChange = (leaseType: 'seconds' | 'minutes' | 'hours' | 'days' | 'years') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      clearError();
      let numericValue: number;
      switch (leaseType) {
        case 'seconds':
          numericValue = parseInt(value);
          if (value.trim().replace(" ", "")==="") {
            setLeaseForm({...leaseForm, seconds: ''});
          } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_SECONDS) {
            setLeaseForm({...leaseForm, seconds: numericValue});
          }
          break;
        case 'minutes':
          numericValue = parseInt(value);
          if (value.trim().replace(" ", "")==="") {
            setLeaseForm({...leaseForm, minutes: ''});
          } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_MINUTES) {
            setLeaseForm({...leaseForm, minutes: numericValue});
          }
          break;
        case 'hours':
          numericValue = parseInt(value);
          if (value.trim().replace(" ", "")==="") {
            setLeaseForm({...leaseForm, hours: ''});
          } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_HOURS) {
            setLeaseForm({...leaseForm, hours: numericValue});
          }
          break;
        case 'days':
          numericValue = parseInt(value);
          if (value.trim().replace(" ", "")==="") {
            setLeaseForm({...leaseForm, days: ''});
          } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_DAYS) {
            setLeaseForm({...leaseForm, days: numericValue});
          }
          break;
        case 'years':
          numericValue = parseInt(value);
          if (value.trim().replace(" ", "")==="") {
            setLeaseForm({...leaseForm, years: ''});
          } else if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= MAX_YEARS) {
            setLeaseForm({...leaseForm, years: numericValue});
          }
          break;

      }
    }
  return {leaseForm, handleChange, clearForm, leaseFormError, validate, clearError}
}
