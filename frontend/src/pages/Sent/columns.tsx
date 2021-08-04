import {GridColDef} from '@material-ui/data-grid';

export const sentColumnFieldsMappings = {
  to: 'to',
  message: 'message',
  dateCreated: 'dateCreated',
  expiresAfter: 'expiresAfter',
  renewLease: 'renewLease',
}

const columns: GridColDef[] = [
  {
    field: sentColumnFieldsMappings.to,
    headerName: 'To',
    minWidth: 180,
    flex: 2,
  },
  {
    field: sentColumnFieldsMappings.message,
    headerName: 'Message',
    minWidth: 180,
    flex: 2,
  },
  {
    field: sentColumnFieldsMappings.dateCreated,
    headerName: 'Date Created',
    width: 180,
  },
  {
    field: sentColumnFieldsMappings.expiresAfter,
    headerName: 'Expires After',
    minWidth: 200,
    flex: 1,
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
