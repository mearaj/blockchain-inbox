import {alpha, makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
  return {
    title: {},
    account: {
      wordBreak: 'break-all',
      marginBottom: 12,
      backgroundColor: alpha(theme.palette.secondary.light,0.1),
      color: theme.palette.common.black,
      flexGrow:1,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      '&$active,&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        cursor: 'pointer',
        '& $buttonSecondary': {
          backgroundColor: theme.palette.primary.light
        },
        '& $buttonPrimary': {
          backgroundColor: theme.palette.primary.light
        },
      }
    },
    cardContent: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
    },
    publicKeyRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 12,
    },
    buttonPrimary: {
      width: 200,
      flexShrink: 0,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.light,
      marginTop:6,
      marginBottom:6,
    },
    buttonSecondary: {
      width: 200,
      flexShrink: 0,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.light,
      marginTop:6,
      marginBottom:6,
    },
    publicKeyContainer: {
      display: 'flex',
      minWidth:0,
    },
    publicKey: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    copyButton: {
      marginRight: 6,
    },
    footerRow: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
    active: {}
  }
});

export default useStyles;

