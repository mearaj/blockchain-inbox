import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getSecondsFromLease} from 'utils/helpers/getSecondsFromLease';
import {formatDuration, getHours, getMinutes, getSeconds, intervalToDuration} from 'date-fns';

export const getExpiryFromTimestampLease = (timestamp: number, lease:Lease):string => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const startDate = Date.now();
  const endDate =  timestamp + getSecondsFromLease(lease) * 1000 + timezoneOffset;
  const interval = {
    start:startDate,
    end:  endDate,
  }
  const duration = intervalToDuration(interval);
  const formattedDuration = formatDuration(duration,
    {delimiter: ', ',
      format:['years', 'days'],
    });


  let hours: number | string = getHours(endDate - startDate);
  let minutes: number | string = getMinutes(endDate - startDate);
  let seconds: number | string = getSeconds(endDate - startDate);
  hours = hours > 9? hours : '0' + hours
  minutes = minutes > 9? minutes : '0' + minutes
  seconds = seconds > 9? seconds : '0' + seconds
  if (endDate  >= startDate + timezoneOffset) {
    return formattedDuration + " " + hours + ":" + minutes + ":" + seconds;
  }
  return "-" + formattedDuration + " " + hours + ":" + minutes + ":" + seconds;
}
