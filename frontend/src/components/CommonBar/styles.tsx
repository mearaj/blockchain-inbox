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
      content: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 58,
        [theme.breakpoints.up('md')]: {
          paddingLeft: 108,
        },
      },
      buttonAccounts: {
        marginLeft: 'auto',
      },
      title: {
        fontWeight: 700,
      },
      titleContainer: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center'
      },
    };
  }
);

export default useStyles;
