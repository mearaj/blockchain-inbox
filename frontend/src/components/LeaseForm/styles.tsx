import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    root: {},
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
  }
})


export default useStyles;
