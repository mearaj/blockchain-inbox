import {GridValueGetterParams} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getLeaseString} from 'utils/helpers';

export const getColumnLeaseString = (params: GridValueGetterParams) => {
  const lease = params.row.lease as Lease;
  return getLeaseString(lease);
};

export default getColumnLeaseString;
