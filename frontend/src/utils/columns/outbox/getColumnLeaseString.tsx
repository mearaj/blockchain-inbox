import {GridValueGetterParams} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getLeaseString} from 'utils/helpers';

export const getColumnLeaseString = (params: GridValueGetterParams) => {
  const lease = params.getValue(params.id, "lease") as Lease;
  return getLeaseString(lease);
};
