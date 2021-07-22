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
      marginBottom: 10,
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  }
});

export default useStyles;

