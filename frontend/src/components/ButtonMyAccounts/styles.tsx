import {makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    return {
      buttonMyAccounts: {
        backgroundColor: theme.palette.common.white,
      },
      accountsMenu: {
        '@global': {
          '.MuiList-root': {
            padding: 0,
          }
        }
      },
      accountsAccordionContainer: {
        maxWidth: 600,
        minWidth: 400,
        padding: '10px 20px',
        backgroundColor: theme.palette.primary.light
      },
      header: {
        display: 'flex',
        backgroundColor: theme.palette.common.black,
        alignItems: 'center',
        justifyContent: "space-between",
        color: theme.palette.common.white
      },
      buttonIconClose: {
        color: theme.palette.common.white
      },
      login: {
        marginBottom: 20,
      }
    };
  }
);


export default useStyles;
