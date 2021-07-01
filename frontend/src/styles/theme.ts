import {createMuiTheme, ThemeOptions} from '@material-ui/core/styles';

const options: ThemeOptions = {
  palette: {},
  typography: {},
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    }
  }
};

const theme = createMuiTheme(options);

export default theme
