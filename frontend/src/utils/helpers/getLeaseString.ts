import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';

export const getLeaseString = (lease: Lease): string => {
  let leaseString = '';
  if (lease.years) {
    leaseString += lease.years + "yr" + (lease.years > 1 ? "s":"");
  }
  if (lease.days) {
    if (lease.years) {
      leaseString += ", " + lease.days + "d" + (lease.days > 1 ? "s":"");
    } else {
      leaseString += lease.days + "d" + (lease.days > 1 ? "s":"")
    }
  }
  if (lease.hours) {
    if (lease.years || lease.days) {
      leaseString += ", " + lease.hours + "hr" + (lease.hours > 1 ? "s":"");
    } else {
      leaseString += lease.hours + "hr" + (lease.hours > 1 ? "s":"")
    }
  }
  if (lease.minutes) {
    if (lease.years || lease.days || lease.hours) {
      leaseString += ", " + lease.minutes + "min" + (lease.minutes > 1 ? "s":"");
    } else {
      leaseString += lease.minutes + "min" + (lease.minutes > 1 ? "s":"");
    }
  }
  if (lease.seconds) {
    if (lease.years || lease.days || lease.hours || lease.minutes) {
      leaseString += " and " + lease.seconds + "s";
    } else {
      leaseString += lease.seconds + " s"
    }
  }
  if (!lease.years && !lease.days && !lease.hours && !lease.minutes) {
    return "Expired!"
  }

  return leaseString;
}
