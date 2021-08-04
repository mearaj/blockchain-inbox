import {alpha, makeStyles} from '@material-ui/core/styles';
import {flexCenterStyle} from 'styles/variables';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    loader: {
      height: '100%',
      width: '100%',
      ...flexCenterStyle,
    },
    dataGrid: {
      backgroundColor: alpha(theme.palette.primary.light, 0.1),
      padding: '0 24px',
      border: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
      '@global': {
        '.MuiIconButton-label .MuiDataGrid-sortIcon.MuiSvgIcon-root': {
          opacity: 0.3,
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
        '.MuiDataGrid-row': {
          backgroundColor: alpha(theme.palette.primary.light, 0.1),
        }
      }
    },
    emptyContainer: {
      ...flexCenterStyle,
    },
    emptyTitle: {
      color: theme.palette.primary.dark,
    },
    renewLease: {
      width: '100%',
      textAlign:'center',
      '@global': {
        ' .MuiButton-root': {
          margin:'auto',
        }
      }
    },
  }
});

export default useStyles;
