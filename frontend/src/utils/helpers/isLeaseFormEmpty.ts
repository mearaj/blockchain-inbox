import {MessageLeaseForm} from 'pages/Compose/interfaces';


export const isLeaseFormEmpty = (leaseForm: MessageLeaseForm): boolean =>
  !leaseForm.seconds && !leaseForm.minutes && !leaseForm.hours && !leaseForm.days && !leaseForm.years;

export default isLeaseFormEmpty;


export const isLeaseFormValid = (leaseForm: MessageLeaseForm):{isValid:boolean, error: string} => {
  if (isLeaseFormEmpty(leaseForm)) {
    return {isValid:false, error:"Lease Cannot Be Zero Or Empty!"};
  }
  return {isValid: true, error: ""};
}
