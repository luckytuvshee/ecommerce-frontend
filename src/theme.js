import { createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    // primary: {
    //   main: "#019AE8",
    //   dark: "#29394D",
    // },
    background: {
      paper: "#f0f4f8",
      default: "#f0f4f8",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: pink[700],
      },
    },
  },
  palette: {
    primary: {
      main: "#F0F4F8",
      dark: "#CFEBEC",
    },
    secondary: {
      // main: "#FFAC9B",
      // main: "#a3b5c4",
      main: "#bbc9d0",
      // dark: "#FF827B",
      dark: "#9bb1c6",
      light: "#F5B8CC",
    },
  },
});

export default theme;
