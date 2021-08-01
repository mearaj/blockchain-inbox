import {alpha, makeStyles} from '@material-ui/core/styles';
import {flexCenterStyle} from 'styles/variables';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    dataGrid: {
      backgroundColor: alpha(theme.palette.common.white, 0.5),
      '@global': {
        '.MuiIconButton-label .MuiDataGrid-sortIcon.MuiSvgIcon-root': {
          opacity: 0.5,
        },
        '.MuiDataGrid-columnHeader:hover,.MuiDataGrid-columnHeader--sorted  .MuiIconButton-label .MuiDataGrid-sortIcon.MuiSvgIcon-root': {
          opacity: 1,
        },
        '.MuiDataGrid-columnHeader': {
          '& .MuiDataGrid-menuIcon .MuiIconButton-label .MuiSvgIcon-root': {
            opacity: 0.5,
            visibility: 'visible',
          },
        },
      }
    },
    emptyContainer: {
      ...flexCenterStyle,
    },
    emptyTitle: {
      color: theme.palette.primary.dark,
    }
  }
});

export default useStyles;

