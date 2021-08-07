import {GridValueGetterParams} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getExpiryFromLease} from 'utils/helpers/getExpiryFromLease';

export const getColumnExpiry = (params: GridValueGetterParams, startDate: number) => {
  const lease: Lease = params.getValue(params.id, 'lease') as Lease;
  return getExpiryFromLease(lease, startDate);
}
