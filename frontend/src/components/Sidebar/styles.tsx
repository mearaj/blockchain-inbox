import {makeStyles, Theme} from '@material-ui/core/styles';
import {drawerWidth} from 'styles/variables';


const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
      },
      drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      toolbar: theme.mixins.toolbar,
      logoContainer: {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      nav: {
        display: 'block',
        paddingLeft: 12,
        paddingRight: 12,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      linkButton: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: 6,
        "&.active, &:hover": {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.dark,
        }
      },
      linkIcon: {},
      linkName: {
        marginLeft: 16,
        fontWeight: 700,
      },
    };
  },
);

export default useStyles;
