import {createTheme, ThemeOptions} from '@material-ui/core/styles';

const options: ThemeOptions = {
  palette: {
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

export default theme;
