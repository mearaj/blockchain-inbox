import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
  return {
    accountCard: {
      wordBreak: 'break-all',
      marginBottom: 12,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      position: 'relative',
      '&$active,&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        cursor: 'pointer'
      }
    },
    active: {}
  }
});

export default useStyles;

