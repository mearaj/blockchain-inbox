import {makeStyles, Theme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => {
    return {
      content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        padding: 6,
      },
      header: {
        display: 'flex',
        flexGrow: 1,
        color: theme.palette.common.white,
        fontSize: 24,
        fontWeight: 'bold',
      },
      logo: {
        height: '100%',
        marginRight: 24,
      },
      expandedMore: {
        fill: theme.palette.common.white,
        fontSize: 36,
      },
      accordionSummary: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    };
  },
);

export default useStyles;
