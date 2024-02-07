import { useState, useMemo, useEffect } from "react";
import { createTheme, PaletteMode } from "@mui/material";
import theme from "./theme";

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
          ...theme.palette,
          mode,
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
