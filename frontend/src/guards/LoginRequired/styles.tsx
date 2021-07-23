import {makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        flexGrow: 1,
      },
      helperText: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 20,
        textAlign: "center",
        maxWidth: 300,
      },
      button: {
        color: theme.palette.common.white,
        "@global .MuiButton-label": {
          color: `${theme.palette.common.white} !important`,
        }
      },
    };
  }
);

export default useStyles;
