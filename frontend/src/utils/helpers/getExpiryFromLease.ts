import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getSecondsFromLease} from 'utils/helpers/getSecondsFromLease';
import {formatDuration, getHours, getMinutes, getSeconds, intervalToDuration} from 'date-fns';


// startDate is number of milliseconds, since unix epoch, the time when lease starts
export const getExpiryFromLease = (lease: Lease, startDate: number): string => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const currentDate = Date.now().valueOf();
  const endDate = startDate + getSecondsFromLease(lease) * 1000
  const interval = {
    start: currentDate,
    end: endDate,
  }
  const duration = intervalToDuration(interval);
  const formattedDuration = formatDuration(duration,
    {
      delimiter: ', ',
      format: ['years', 'days'],
    });


  let hours: number | string = getHours(endDate - currentDate + timezoneOffset);
  let minutes: number | string = getMinutes(endDate - currentDate + timezoneOffset);
  let seconds: number | string = getSeconds(endDate - currentDate + timezoneOffset);
  hours = hours > 9 ? hours:'0' + hours
  minutes = minutes > 9 ? minutes:'0' + minutes
  seconds = seconds > 9 ? seconds:'0' + seconds
  if (endDate >= currentDate) {
    return formattedDuration + " " + hours + ":" + minutes + ":" + seconds;
  }
  return "Expired!";
}
