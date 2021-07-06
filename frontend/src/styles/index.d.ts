// Ref https://material-ui.com/guides/typescript/#typescript
import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {

  }

  interface ThemeOptions {

  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
  }

  interface PaletteOptions {

  }

  interface CommonColors {
    colorBluzelle: string;
    colorMetamask: string;
  }
}
