import {makeStyles, Theme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme:Theme) => {

  return {
    root: {},
    accounts: {
      marginTop: 40,
    },
    accordionDetails: {
      flexDirection: 'column',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: 24,
    },
    accountCard: {
      wordBreak: 'break-all',
      marginBottom: 12,
      '&$active,&:hover': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        cursor: 'pointer'
      }
    },
    active: {}
  }
});

export default useStyles;
