import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: '100%'
    },
    focused: {
      color: theme.palette.primary.main
    }
  }
});

export default useStyles;

