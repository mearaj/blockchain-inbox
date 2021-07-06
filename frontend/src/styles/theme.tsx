import {createMuiTheme, ThemeOptions} from '@material-ui/core/styles';
import {colorBluzelle, colorMetamask} from './variables';

const options: ThemeOptions = {
  palette: {
    common: {
      colorMetamask,
      colorBluzelle
    },
  },

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
