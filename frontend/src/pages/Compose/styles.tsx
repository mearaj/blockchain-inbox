import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
  return {
    root: {},
    formControlContainer: {
      marginTop: 20,
      marginBottom: 30,
    },
    form: {
      width: '100%'
    },
    accordionDetails: {
      display: 'flex'
    },
    submitButton: {
      backgroundColor: theme.palette.success.main,
      marginLeft: 24,
      color: theme.palette.common.white,
      '&:hover,&:focus,&:active': {
        backgroundColor: theme.palette.success.dark,
      }
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  }
});

export default useStyles;

