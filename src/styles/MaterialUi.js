import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const MaterialUi = (props) => {
  const { children } = props;
  const { darkTheme } = useSelector((state) => state.styles);
  // Override the default size of material ui
  const theme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
    typography: {
      htmlFontSize: 10,
      fontFamily: `"Oswald", sans-serif`,
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          html: {
            fontSize: "62.5%",
          },
        },
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

MaterialUi.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MaterialUi;
