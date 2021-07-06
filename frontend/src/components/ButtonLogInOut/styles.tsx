import {makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
      buttonMetamask: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.colorMetamask
      },
      buttonCurium: {
        color: theme.palette.common.colorBluzelle,
        backgroundColor: theme.palette.common.white
      }
    };
  }
);


export default useStyles;
