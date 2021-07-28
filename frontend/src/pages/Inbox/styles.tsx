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

