import {MessageLeaseForm} from 'pages/Compose/interfaces';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';

export const getLeaseFromLeaseForm = (leaseForm: MessageLeaseForm): Lease => {
  return {
    seconds: leaseForm.seconds==="" ? 0:leaseForm.seconds,
    minutes: leaseForm.minutes==="" ? 0:leaseForm.minutes,
    hours: leaseForm.hours==="" ? 0:leaseForm.hours,
    days: leaseForm.days==="" ? 0:leaseForm.days,
    years: leaseForm.years==="" ? 0:leaseForm.years,
  };
}
