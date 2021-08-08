import {GridValueGetterParams} from '@material-ui/data-grid';

export const getColumnFromValue = (params: GridValueGetterParams) => {
  return `${params.row.creatorChainName}  ${params.row.creatorPublicKey}`

};

export default getColumnFromValue;

