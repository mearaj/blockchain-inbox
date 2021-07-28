import {GridColDef, GridValueGetterParams} from '@material-ui/data-grid';

const columns: GridColDef[] = [
  {
    field: 'to',
    headerName: 'To',
    minWidth: 300,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.getValue(params.id, 'recipientChainName')}  ` +
        `${params.getValue(params.id, 'recipientPublicKey')}`
    },
  },
  {
    field: 'message',
    headerName: 'Message',
    minWidth: 300,
  },
]

export default columns;
