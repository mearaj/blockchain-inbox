import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: '100%',
    },
    accordionDetails: {
      display: 'flex',
    },
    form: {
      width: '100%',
    },

    formControlContainer: {
      marginTop: 20,
      marginBottom: 30,
    },
    copyToClipboard: {
      width: 200,
      marginBottom: 20,
    },
    loginButton: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
      marginLeft: 24,
      '&:hover,&:focus,&:active': {
        backgroundColor: theme.palette.success.dark,
      }
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
    }
  }
});

export default useStyles;

