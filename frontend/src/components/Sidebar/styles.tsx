import {makeStyles, Theme} from '@material-ui/core/styles';
import {drawerWidth} from 'styles/variables';


const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
      },
      drawer: {
        [theme.breakpoints.up('md')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      toolbar: theme.mixins.toolbar,

      logoContainer: {
        backgroundColor: 'transparent',
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
        backgroundImage: `linear-gradient(
        ${theme.palette.primary.main} 0%,
         ${theme.palette.primary.light} 50%,
         ${theme.palette.primary.dark} 100%
        )`
      },
      linkButton: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: 6,
        color: theme.palette.common.white,
        "&.active, &:hover": {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
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
