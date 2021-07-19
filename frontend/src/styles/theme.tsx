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
  }
};

const theme = createTheme(options);

export default theme
