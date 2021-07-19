import {makeStyles, Theme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme:Theme) => {

  return {
    root: {},
    login: {
      marginBottom: 50,
    },
    accounts: {
      marginTop: 40,
    },
    accordionDetails: {
      flexDirection: 'column',
      display: 'block',
    },
    accountCard: {
      marginBottom: 12,
    },
    accordionSummary: {
      display: 'flex',
      minWidth: 0,
    },

    radio: {
      flexShrink:0,
      minWidth: 50,
    },
    expandedMoreIcon: {
      flexShrink: 0,
      color:'red',
      fill: 'red',
      minWidth: 50,
    },
    active: {}
  }
});

export default useStyles;
