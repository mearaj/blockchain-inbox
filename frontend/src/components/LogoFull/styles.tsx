import {makeStyles, Theme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        display: 'flex',
        fill: theme.palette.common.white,
        justifyContent: 'center',
        alignItems: 'center'
      },
      logo: {
        marginRight: 12
      },
      logoTitle: {
        fontSize: 28,
        fontWeight: 'bolder',
        color: theme.palette.common.white
      }
    };
  },
);


export default useStyles;
