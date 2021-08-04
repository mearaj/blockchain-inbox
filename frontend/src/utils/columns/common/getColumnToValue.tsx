import {GridValueGetterParams} from '@material-ui/data-grid';

export const getColumnToValue = (params: GridValueGetterParams) => {
  return `${params.getValue(params.id, 'recipientChainName')}  ` +
    `${params.getValue(params.id, 'recipientPublicKey')}`
};

export default getColumnToValue;

