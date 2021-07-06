import {makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
        justifyContent: 'center',
      },
      title: {
        fontWeight: 700,
      }
    };
  }
);

export default useStyles;
