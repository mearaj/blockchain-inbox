import {GridColDef, GridValueGetterParams} from '@material-ui/data-grid';

const columns: GridColDef[] = [
  {
    field: 'from',
    headerName: 'From',
    minWidth: 300,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.getValue(params.id, 'creatorChainName')}  ` +
        `${params.getValue(params.id, 'creatorPublicKey')}`
    },
  },
  {
    field: 'message',
    headerName: 'Message',
    minWidth: 300,
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    minWidth: 300,
    valueGetter: (params: GridValueGetterParams) => {
      const timestamp:number = params.getValue(params.id, 'timestamp') as number;
      return `${new Date(timestamp).toLocaleString()}`
    },
  }
]

export default columns;
