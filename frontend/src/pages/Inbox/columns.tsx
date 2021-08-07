import {GridColDef} from '@material-ui/data-grid';
import {sentColumnFieldsMappings} from 'pages/Sent/columns';

export const inboxColumnFieldsMappings = {
  from: 'from',
  message: 'message',
  dateCreated: 'dateCreated',
  expiresAfter: 'expiresAfter',
  renewLease: 'renewLease',
  delete: 'delete',
}


const columns: GridColDef[] = [
  {
    field: inboxColumnFieldsMappings.from,
    headerName: 'From',
    minWidth: 180,
    flex: 2,
  },
  {
    field: inboxColumnFieldsMappings.message,
    headerName: 'Message',
    minWidth: 250,
    flex: 2,
  },
  {
    field: inboxColumnFieldsMappings.dateCreated,
    headerName: 'Date Created',
    width: 180,
  },
  {
    field: inboxColumnFieldsMappings.expiresAfter,
    headerName: 'Expires After',
    minWidth: 200,
    flex: 1,
  },
  {
    field: inboxColumnFieldsMappings.renewLease,
    headerName: 'Renew Lease',
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: sentColumnFieldsMappings.delete,
    headerName: 'Delete',
    sortable: false,
    filterable: false,
    width: 150,
  },
]

export default columns;
