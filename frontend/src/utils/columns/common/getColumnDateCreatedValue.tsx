import {GridValueGetterParams} from '@material-ui/data-grid';

export const getColumnDateCreatedValue = (params: GridValueGetterParams) => {
  const timestamp: number = params.row.timestamp as number;
  return `${new Date(timestamp).toDateString()}`
}

