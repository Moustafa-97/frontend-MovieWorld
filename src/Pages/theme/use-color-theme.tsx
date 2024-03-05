import { useState, useMemo, useEffect } from "react";
import { createTheme, PaletteMode } from "@mui/material";
import theme from "./theme";
import { amber, blue, deepOrange, grey } from "@mui/material/colors";

export const useColorTheme = () => {
  const mymode: String | null | any = localStorage.getItem("mymode");
  const [mode, setMode] = useState<PaletteMode>("dark");
  useEffect(()=>{
    if(mymode==="light"){
      setMode("dark");
    }

  },[mymode])

  const toggleColorMode = () =>
    setMode((prevMod) => (prevMod === "light" ? "dark" : "light"));

  const modifiedTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode,
          ...(mode === 'light'
          ? {
              // palette values for light mode
              primary: amber,
              divider: amber[200],
              background: {
                default: blue[900],
                paper: blue[900],
              },
              text: {
                primary: amber[900],
                secondary: amber[800],
              },
            }
          : {
              // palette values for dark mode
              primary: grey,
              divider: deepOrange[700],
              background: {
                default: grey[900],
                paper: grey[900],
              },
              text: {
                primary: '#fff',
                secondary: grey[500],
              },
            }),
              // mode,
          
        },
      }),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
