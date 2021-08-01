import {GridCellValue, GridColDef, GridSortCellParams, GridValueGetterParams} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {formatDuration, getHours, getMinutes, getSeconds, intervalToDuration} from 'date-fns';
import {getSecondsFromLease} from 'utils/helpers';

const columns: GridColDef[] = [
  {
    field: 'from',
    headerName: 'From',
    minWidth: 250,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.getValue(params.id, 'creatorChainName')}  ` +
        `${params.getValue(params.id, 'creatorPublicKey')}`
    },
  },
  {
    field: 'message',
    headerName: 'Message',
    minWidth: 250,
    flex: 1,
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    minWidth: 180,
    valueGetter: (params: GridValueGetterParams) => {
      const timestamp: number = params.getValue(params.id, 'timestamp') as number;
      return `${new Date(timestamp).toDateString()}`
    },
    sortComparator: (v1: GridCellValue, v2: GridCellValue, cellParams1: GridSortCellParams, cellParams2: GridSortCellParams) => {
      const v1Date = Date.parse(v1 as string);
      const v2Date = Date.parse(v2 as string);
      return v1Date - v2Date;
    },
  },
  {
    field: 'expiresAfter',
    headerName: 'Time Left',
    minWidth: 200,
    flex: 1,
    valueGetter: (params) => {
      const lease: Lease = params.getValue(params.id, 'lease') as Lease;
      const timestamp = params.getValue(params.id, 'timestamp') as number;
      const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
      const startDate = Date.now() - timezoneOffset;
      const endDate =  timestamp + getSecondsFromLease(lease) * 1000;
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
      if (endDate - timezoneOffset > startDate) {
        return formattedDuration + " " + hours + ":" + minutes + ":" + seconds;
      }
      return "-" + formattedDuration + " " + hours + ":" + minutes + ":" + seconds;
    },
    sortComparator: (v1: GridCellValue, v2: GridCellValue, cellParams1: GridSortCellParams, cellParams2: GridSortCellParams) => {
      const v1Lease = cellParams1.api.getRow(cellParams1.id).lease as Lease;
      const v2Lease = cellParams2.api.getRow(cellParams2.id).lease as Lease;
      const v1LeaseSeconds = getSecondsFromLease(v1Lease);
      const v2LeaseSeconds = getSecondsFromLease(v2Lease);

      return v1LeaseSeconds - v2LeaseSeconds;
    },
  },
]

export default columns;
