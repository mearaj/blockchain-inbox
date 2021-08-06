import {MessageLeaseForm} from 'pages/Compose/interfaces';


export const isLeaseFormEmpty = (leaseForm: MessageLeaseForm): boolean =>
  !leaseForm.seconds && !leaseForm.minutes && !leaseForm.hours && !leaseForm.days && !leaseForm.years;

export default isLeaseFormEmpty;
