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
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  }
});

export default useStyles;

