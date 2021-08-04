import {GridColDef} from '@material-ui/data-grid';

export const outboxColumnFieldsMappings = {
  to:'to',
  message:'message',
  dateCreated: 'dateCreated',
  leasePeriod: 'leasePeriod',
}

const columns: GridColDef[] = [
  {
    field: outboxColumnFieldsMappings.to,
    headerName: 'To',
    minWidth: 180,
    flex: 2,
  },
  {
    field: outboxColumnFieldsMappings.message,
    headerName: 'Message',
    minWidth: 180,
    flex: 2,
  },
  {
    field: outboxColumnFieldsMappings.dateCreated,
    headerName: 'Date Created',
    width: 180,
  },
  {
    field: 'leasePeriod',
    headerName: 'Lease Period',
    minWidth: 200,
    flex: 1,
  },
]

export default columns;
