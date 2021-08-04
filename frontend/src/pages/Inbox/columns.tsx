import {
 GridCellParams,
 GridCellValue,
 GridColDef,
 GridSortCellParams,
 GridValueGetterParams
} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getSecondsFromLease} from 'utils/helpers';
import {getExpiryFromTimestampLease} from 'utils/helpers/getExpiryFromTimestampLease';
import {Schedule} from '@material-ui/icons';
import {Button, Typography} from '@material-ui/core';


const columns: GridColDef[] = [
  {
    field: 'from',
    headerName: 'From',
    minWidth: 180,
    flex: 2,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.getValue(params.id, 'creatorChainName')}  ` +
        `${params.getValue(params.id, 'creatorPublicKey')}`
    },
  },
  {
    field: 'message',
    headerName: 'Message',
    minWidth: 250,
    flex: 2,
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    width: 180,
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
      return getExpiryFromTimestampLease(timestamp, lease);
    },
    sortComparator: (v1: GridCellValue, v2: GridCellValue, cellParams1: GridSortCellParams, cellParams2: GridSortCellParams) => {
      const v1Lease = cellParams1.api.getRow(cellParams1.id).lease as Lease;
      const v2Lease = cellParams2.api.getRow(cellParams2.id).lease as Lease;
      const v1LeaseSeconds = getSecondsFromLease(v1Lease);
      const v2LeaseSeconds = getSecondsFromLease(v2Lease);
      return v1LeaseSeconds - v2LeaseSeconds;
    },
  },
  {
    field: 'renewLease',
    headerName: 'Renew Lease',
    sortable: false,
    filterable: false,
    width: 150,
    renderCell: (params: GridCellParams) => {
      return <Button color="secondary" variant="contained">
        <Schedule/>
        <Typography style={{marginLeft: 6}}>Renew</Typography>
      </Button>
    },
  },
]

export default columns;
