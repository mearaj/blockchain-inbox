import {makeStyles, Theme} from '@material-ui/core/styles';
import {drawerWidth} from 'styles/variables';

const useStyles = makeStyles((theme: Theme) => {
    return {
      appBar: {
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      logoContainer: {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      title: {
        fontWeight: 700,
      },
      titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexGrow:1,
      },
    };
  }
);

export default useStyles;
