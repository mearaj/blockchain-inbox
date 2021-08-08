import {GridValueGetterParams} from '@material-ui/data-grid';

export const getColumnToValue = (params: GridValueGetterParams) => {
  return `${params.row.recipientChainName}  ${params.row.recipientPublicKey}`
};

export default getColumnToValue;

