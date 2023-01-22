"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
