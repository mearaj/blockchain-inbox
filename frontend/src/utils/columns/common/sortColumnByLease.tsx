import {GridCellValue, GridSortCellParams} from '@material-ui/data-grid';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {getSecondsFromLease} from 'utils/helpers';

export const sortColumnByLease = (v1: GridCellValue, v2: GridCellValue, cellParams1: GridSortCellParams, cellParams2: GridSortCellParams) => {
  const v1Lease = cellParams1.api.getRow(cellParams1.id).lease as Lease;
  const v2Lease = cellParams2.api.getRow(cellParams2.id).lease as Lease;
  const v1LeaseSeconds = getSecondsFromLease(v1Lease);
  const v2LeaseSeconds = getSecondsFromLease(v2Lease);
  return v1LeaseSeconds - v2LeaseSeconds;
};

export default sortColumnByLease;
