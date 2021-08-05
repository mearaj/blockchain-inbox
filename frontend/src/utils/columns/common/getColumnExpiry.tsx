import {GridValueGetterParams} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getExpiryFromTimestampLease} from 'utils/helpers/getExpiryFromTimestampLease';

export const getColumnExpiry = (params:GridValueGetterParams) => {
  const lease: Lease = params.getValue(params.id, 'lease') as Lease;
  const timestamp = params.getValue(params.id, 'timestamp') as number;
  return  getExpiryFromTimestampLease(timestamp, lease);
}

export default getColumnExpiry;
