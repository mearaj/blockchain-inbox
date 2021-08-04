import {GridCellValue, GridColDef, GridSortCellParams} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getSecondsFromLease} from 'utils/helpers';

const columns: GridColDef[] = [
  {
    field: 'to',
    headerName: 'To',
    minWidth: 180,
    flex: 2,
  },
  {
    field: 'message',
    headerName: 'Message',
    minWidth: 180,
    flex: 2,
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    width: 180,
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
  },
]

export default columns;
