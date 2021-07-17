import {makeStyles} from '@material-ui/core/styles';
import {drawerWidth} from 'styles/variables';


const useStyles = makeStyles((theme) => {
  return {
    root: {

    },
    accountCard: {
      wordBreak: 'break-all',
      marginBottom: 12,
      '&$active,&:hover': {
        backgroundColor:theme.palette.secondary.light,
        color: theme.palette.common.white,
        cursor: 'pointer'
      }
    },
    active: {

    }
  }
});

export default useStyles;

