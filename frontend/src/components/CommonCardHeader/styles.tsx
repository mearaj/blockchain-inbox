import {makeStyles, Theme} from '@material-ui/core/styles';
import {drawerWidth} from 'styles/variables';


const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        padding: 6,
      },
      header: {
        flexGrow: 1,
        color: theme.palette.common.white,
        fontSize: 24,
        fontWeight: 'bold',
      },
      logo: {
        height: 30
      },
    };
  },
);

export default useStyles;
