import {alpha, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
    return {
        'root': {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: '100%',
            width: '100%',
            alignItems: 'center'
        },
        card: {
            display: 'flex',
            width: '100%',
            //height: '100%',
            backgroundColor: alpha(theme.palette.primary.light, 0.1),
            padding: 24,
            flexDirection: 'column',
            overflowY: 'auto'
        },
        header: {
            backgroundColor: theme.palette.primary.main,
            marginBottom: 30,
        },
        buttonBack: {
            color: theme.palette.common.white,
            height: 48,
            padding: 12
        },
        back: {
            marginLeft: 6
        },
        formControl: {
            width: '100%',
            display: 'flex',
            marginBottom: 20,
        },
        label: {
            display: 'flex',
            width: 200,
            flexShrink: 0,
            alignItems: 'center',
            color: alpha(theme.palette.primary.main, 0.7),
            fontWeight: 400,
        },
        textField: {
            color: theme.palette.primary.dark,
            '@global .MuiInputBase-root.Mui-disabled': {
                color: theme.palette.primary.dark,
                fontWeight: 500,
            }
        },
        buttonRenew: {
            flexGrow: 1,
        },
        footer: {
            width: '100%',
            display: 'flex',
            marginTop: 20,
            marginBottom: 20,
        },
    }
});

export default useStyles;
