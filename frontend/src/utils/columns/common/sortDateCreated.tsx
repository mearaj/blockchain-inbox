import {GridCellValue, GridSortCellParams} from '@material-ui/data-grid';

export const sortDateCreated = (v1: GridCellValue, v2: GridCellValue, _cellParams1: GridSortCellParams, _cellParams2: GridSortCellParams) => {
  const v1Date = Date.parse(v1 as string);
  const v2Date = Date.parse(v2 as string);
  return v1Date - v2Date;
};

