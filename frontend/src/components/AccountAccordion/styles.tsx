import {alpha, darken, makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
  console.log(darken(theme.palette.primary.dark, 0.5));
  return {
    root: {
      wordBreak: 'break-all',
      backgroundColor: alpha(theme.palette.common.black, 1),
      color: theme.palette.common.white,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      '&$current': {
        backgroundColor: theme.palette.secondary.dark,
      }
    },
    // used by root
    current: {},
    title: {},
    accordionSummary: {
      display: 'flex',
      alignItems: 'center',
      padding: 3
    },
    radio: {
      flexShrink: 0,
      color: theme.palette.common.white,
      '&$checked': {
        color: theme.palette.common.white,
      }
    },
    checked: {},
    radioCurrent: {
      flexShrink: 0,
      color: theme.palette.common.white,
      fill: theme.palette.common.white,
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      color: alpha(theme.palette.common.white, 0.9),
    },
    labelChainName: {
      display:'inline',
      fontSize: 24,
      flexShrink: 0,
      fontWeight: 'bold',
      marginRight: 6,
      lineHeight: 0.9,
    },
    labelPublicKey: {
      display: 'inline',
      fontSize: 16,
      color: alpha(theme.palette.common.white, 0.7),
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    labelCurrent: {
      color: theme.palette.secondary.main,
    },
    expandedMoreIcon: {
      fontSize: 36,
      flexShrink: 0,
      color: theme.palette.common.white,
      transform: 'rotate(0deg)',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s',
      '&$rotatedIcon': {
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s',
        transform: 'rotate(180deg)'
      }
    },
    expandedMoreIconButton: {
      marginLeft: 'auto',
    },
    rotatedIcon: {},

    publicKeyRow: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 32,
    },
    buttonPrimary: {
      width: 200,
      marginTop: 6,
      marginBottom: 6,
    },
    buttonSecondary: {
      width: 200,
      flexShrink: 0,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.light,
      marginTop: 6,
      marginBottom: 6,
    },

    publicKey: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    copyButton: {
      marginRight: 6,
      width: 200,
    },
    active: {}
  }
});

export default useStyles;

