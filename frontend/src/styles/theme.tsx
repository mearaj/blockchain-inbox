import {createTheme, ThemeOptions} from '@material-ui/core/styles';
import {deepPurple, pink, purple} from '@material-ui/core/colors';

const options: ThemeOptions = {
  palette: {
    primary: deepPurple,
    secondary: pink,
    common: {},
  },

  typography: {},
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    },
    MuiFormControl: {
      root: {
        marginBottom: 24,
      },
    },
    MuiFormLabel: {
      root: {
        marginBottom: 8,
        display: 'block',
      }
    }
  }
};

const theme = createTheme(options);

export default theme
