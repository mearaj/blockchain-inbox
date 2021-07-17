import {makeStyles, Theme} from '@material-ui/core/styles';
import {drawerWidth} from 'styles/variables';


const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
        fill: theme.palette.common.white,
        maxHeight: '100%',
        height: 48,
        width: 48,
      },
      top: {
        fill: theme.palette.common.white
      },
      topRight: {
        fill: theme.palette.common.white
      },
      right: {
        fill: theme.palette.common.white
      },
      bottomRight: {
        fill: theme.palette.common.white
      },
      center: {
        fill: theme.palette.common.white
      }
    };
  },
);

export default useStyles;
