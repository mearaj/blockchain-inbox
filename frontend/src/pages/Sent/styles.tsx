import {makeStyles} from '@material-ui/core/styles';
import {flexCenterStyle} from 'styles/variables';


const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
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

