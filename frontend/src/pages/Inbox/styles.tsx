import {alpha, makeStyles} from '@material-ui/core/styles';
import {flexCenterStyle} from 'styles/variables';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: '100%',
      width: '100%',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: 10,
      backgroundColor: alpha(theme.palette.primary.light, 0.1),
      borderRadius: 4,
      overflow: 'auto',
      cursor: 'pointer',
      position: 'relative',
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
      '&$gridHeader': {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        cursor: 'auto'
      }
    },
    gridHeader: {},
    column: {
      wordBreak: 'break-all',
      padding: '10px 20px',
      backgroundColor: alpha(theme.palette.primary.light, 0.1),
      //borderTop: `1px solid ${alpha(theme.palette.primary.light,0.2)}`,
    },
    columnHeader: {
      padding: '10px 20px',
      fontSize: 20,
      cursor: 'auto'
    },
    emptyContainer:{
      ...flexCenterStyle,
    },
    emptyTitle: {
      color:theme.palette.primary.dark,
    }
  }
});

export default useStyles;

