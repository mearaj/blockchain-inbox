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
    leaseFormGroup: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridColumnGap: 30,
    },
    leaseLabel: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
    },
    leaseError: {
      marginLeft: 10,
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

