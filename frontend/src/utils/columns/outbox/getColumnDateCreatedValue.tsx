import {GridValueGetterParams} from '@material-ui/data-grid';

export const getColumnDateCreatedValue = (params: GridValueGetterParams) => {
  const timestamp: number = params.getValue(params.id, 'timestamp') as number;
  return `${new Date(timestamp).toDateString()}`
}

export default getColumnDateCreatedValue;

