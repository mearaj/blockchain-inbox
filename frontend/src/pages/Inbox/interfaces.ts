import {GridCellValue, GridColDef, GridSortCellParams, GridValueGetterParams} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {formatDuration} from 'date-fns';

const columns: GridColDef[] = [
  {
    field: 'from',
    headerName: 'From',
    minWidth: 250,
    flex:1,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.getValue(params.id, 'creatorChainName')}  ` +
        `${params.getValue(params.id, 'creatorPublicKey')}`
    },
  },
  {
    field: 'message',
    headerName: 'Message',
    minWidth: 250,
    flex:1,
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
    headerName: 'Expires After',
    minWidth: 200,
    valueGetter: (params) => {
      const lease: Lease = params.getValue(params.id, 'lease') as Lease;
      return formatDuration({
        years: lease.years,
        days: lease.days,
        hours: lease.hours,
        minutes: lease.minutes,
        seconds: lease.seconds,
      })
    },
    sortComparator: (v1: GridCellValue, v2: GridCellValue, cellParams1: GridSortCellParams, cellParams2: GridSortCellParams) => {
      const v1Lease = cellParams1.api.getRow(cellParams1.id).lease as Lease;
      const v2Lease = cellParams2.api.getRow(cellParams2.id).lease as Lease;
      const {seconds: v1Seconds, minutes: v1Minutes, hours: v1Hours, days: v1Days, years: v1Years} = v1Lease;
      const v1LeaseSeconds = v1Seconds +
                            (v1Minutes * 60) +
                            (v1Hours * 60 * 60) +
                            (v1Days * 24 * 60 * 60) +
                            (v1Years * 365 * 24 * 60 * 60);
      const {seconds: v2Seconds, minutes: v2Minutes, hours: v2Hours, days: v2Days, years: v2Years} = v2Lease;
      const v2LeaseSeconds = v2Seconds +
        (v2Minutes * 60) +
        (v2Hours * 60 * 60) +
        (v2Days * 24 * 60 * 60) +
        (v2Years * 365 * 24 * 60 * 60);

      return  v1LeaseSeconds - v2LeaseSeconds;
    },
  },
]

export default columns;
