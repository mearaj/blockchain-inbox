import {alpha, darken, makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
  console.log(darken(theme.palette.primary.dark, 0.5));
  return {
    root: {
      wordBreak: 'break-all',
      backgroundColor: alpha(theme.palette.common.black,1),
      color: theme.palette.common.white,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      '&$current': {
        backgroundColor: theme.palette.secondary.dark,
      }
    },
    current: {},
    title: {},
    header: {
      display: 'flex',
      alignItems: 'center',
    },
    radio: {
      flexShrink: 0,
      color: theme.palette.common.white,
      '&$checked': {
        color: theme.palette.common.white,
      }
    },
    checked: {

    },
    radioCurrent: {
      flexShrink: 0,
      color: theme.palette.common.white,
      fill: theme.palette.common.white,
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      color: alpha(theme.palette.common.white,0.9),
    },
    labelChainName: {
      fontSize: 24,
      flexShrink:0,
      fontWeight: 'bold',
      marginRight: 6,
      lineHeight: 0.9,
    },
    labelPublicKey: {
      fontSize: 16,
      color: alpha(theme.palette.common.white,0.7),
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    labelCurrent: {
      color: theme.palette.secondary.main,
    },
    expandedMoreIconButton: {
      flexShrink: 0,
      fontSize: 36,
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s',
      color: theme.palette.common.white,
      marginLeft: 'auto'
    },
    expandedMoreIconButtonRotated: {
      flexShrink: 0,
      transform: 'rotate(180deg)',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s',
    },
    expandedMoreIcon: {
      fontSize: 36,
    },
    expandedMoreIconCurrent: {
      flexShrink: 0,
      fontSize: 36,
      color: theme.palette.common.white,
    },
    body: {
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s',
      maxHeight: 500,
    },
    bodyCollapsed: {
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s',
      maxHeight: 0,
      overflow: 'hidden'
    },
    cardContent: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      padding: 3,
    },
    publicKeyRow: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 45,
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
    publicKeyContainer: {
      display: 'flex',
      minWidth: 0,
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

