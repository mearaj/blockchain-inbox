import {alpha, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
        height: '100%'
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: theme.spacing(3),
        overflow: 'auto',
        backgroundColor: alpha(theme.palette.primary.light, 0.2),
      },
    };
  }
);

export default useStyles;
