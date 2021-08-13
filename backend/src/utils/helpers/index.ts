import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';

export const getLeaseFromSeconds = (totalSeconds: number): Lease => {
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInYear = 365 * secondsInDay;


    const years = Math.trunc(totalSeconds / secondsInYear);
    let remainingSeconds = totalSeconds % secondsInYear;
    const days = Math.trunc(remainingSeconds / secondsInDay);
    remainingSeconds = remainingSeconds % secondsInDay;
    const hours = Math.trunc(remainingSeconds / secondsInHour);
    remainingSeconds = remainingSeconds % secondsInHour;
    const minutes = Math.trunc(remainingSeconds / secondsInMinute);
    remainingSeconds = remainingSeconds % secondsInMinute;
    const seconds = remainingSeconds;
    return {seconds, minutes, hours, days, years};
}
