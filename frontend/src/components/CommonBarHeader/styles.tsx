import {makeStyles, Theme} from '@material-ui/core/styles';
import {drawerWidth} from 'styles/variables';

const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
        justifyContent: 'center',
      },
      title : {
        fontWeight: 700,
      }
    };
  }
);

export default useStyles;
