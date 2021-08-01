import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';

export const getSecondsFromLease = (lease: Lease): number => {
  const {seconds, minutes, hours, days, years} = lease;
  return seconds +
    (minutes * 60) +
    (hours * 60 * 60) +
    (days * 24 * 60 * 60) +
    (years * 365 * 24 * 60 * 60);
}
