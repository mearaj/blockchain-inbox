import {GridValueGetterParams} from '@material-ui/data-grid';

export const getColumnFromValue = (params: GridValueGetterParams) => {
  return `${params.getValue(params.id, 'creatorChainName')}  ` +
    `${params.getValue(params.id, 'creatorPublicKey')}`
};

export default getColumnFromValue;

