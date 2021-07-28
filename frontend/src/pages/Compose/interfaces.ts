export enum KeyValues {
  ID_RECIPIENT_CHAIN_NAME = "ID_RECIPIENT_CHAIN_NAME",
  ID_RECIPIENT_PUBLIC_KEY = "ID_RECIPIENT_PUBLIC_KEY",
  ID_MESSAGE = "ID_MESSAGE",
  ID_LEASE_SECONDS = "ID_LEASE_SECONDS",
  ID_LEASE_MINUTES = "ID_LEASE_MINUTES",
  ID_LEASE_HOURS = "ID_LEASE_HOURS",
  ID_LEASE_DAYS = "ID_LEASE_DAYS",
  ID_LEASE_YEARS = "ID_LEASE_YEARS",
}

export interface MessageLeaseForm {
  seconds: number | '';
  minutes: number | '';
  hours: number | '';
  days: number | '';
  years: number | '';
}

export const MAX_SECONDS = 59;
export const MAX_MINUTES = 59;
export const MAX_HOURS = 23;
export const MAX_DAYS = 365;
export const MAX_YEARS = 9;
