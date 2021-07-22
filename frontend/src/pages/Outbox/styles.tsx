import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: '100%',
      height:'100%',
      backgroundColor: theme.palette.common.white,
    },
    table: {
      flexGrow:0,
    },
  }
});

export default useStyles;

