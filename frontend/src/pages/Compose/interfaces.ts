export interface ComposeSliceForm {
  publicKey: string;
  chainName: string;
  message: string;
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
